import React from "react";
import * as R from "ramda";
import { Redirect } from 'react-router'
import games from "./data/games";
import PouchDB from "pouchdb";
import Upgrade from "./Upgrade";

var localDb = new PouchDB('matches');
var remoteDb = new PouchDB(process.env.REACT_APP_remotePouchDb + '/matches');

class NewGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
    this._isMounted = false;
    this.game = games[this.props.match.params.game];
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(game, gameName, user, users, submitThis, event) {
    let userData = R.split(',', users);
    let game_data = {
      _id: gameName + "_" + user,
      created: new Date().toISOString(),
      game: games[game],
      gameTitle: games[game].info.title,
      users: userData,
      gameName: gameName,
    };
    localDb.put(game_data, function callback(err, result) {
      if (err) {
          console.log('err');
          console.log(err);
        } else {
          let dbName = "game_information_" + game_data._id;
          let localGameInfoDb = new PouchDB(dbName);
          let remoteGameInfoDb = new PouchDB(process.env.REACT_APP_remotePouchDb + dbName);
          let numberOfPlayers = userData.length;
          let userInfo = {};
          R.addIndex(R.map)(
            (user, i) => (
                userInfo[user]= {capital : games[game].players[numberOfPlayers].capital}
              ),
              userData
          );
          let gameInfoData = {
            _id: gameName + "_" + user,
            created: new Date().toISOString(),
            userData: userInfo,
            bankSize: games[game].bank,
          };
          submitThis.sync();
          localGameInfoDb.put(gameInfoData, function callback(err, result) {
            if (err) {
                console.log('err');
                console.log(err);
              }
          });
          submitThis.sync(localGameInfoDb, remoteGameInfoDb);
          if (submitThis._isMounted) {
            submitThis.setState(() => ({ redirect: true, gameToLoad: games[game].info.title, gameNameToLoad: gameName }))
          }
        }
    });
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  sync(localGameInfoDb, remoteGameInfoDb) {
    let opts = {live: true};
    localDb.replicate.to(remoteDb, opts);
    localDb.replicate.from(remoteDb, opts);
    if (localGameInfoDb && remoteGameInfoDb) {
      localGameInfoDb.replicate.to(remoteGameInfoDb, opts);
      localGameInfoDb.replicate.from(remoteGameInfoDb, opts);
    }
  }

  render() {
    this.sync();
    if (this.state.redirect === true) {
        let redirect = "/" + this.state.gameToLoad + "/upgrade?gameToLoad=" + this.state.gameNameToLoad;
        return (<Redirect to={redirect} component={Upgrade} />);
    } else {
      let gameOptions = R.addIndex(R.map)(
        (game, i) => (
            <option key={i} value={game.info.title}>{game.info.title}</option>
          ),
          games
      );
      let gameSelect = R.values(gameOptions);
      return (
        <div>
          Name your Game: <input id="gameName" name="gameName" type="text" />
          Add Users: <input id="users" name="users" type="text" />
          Pick Your Game: <select id="game">{gameSelect}</select>
          <button onClick={() => {this.handleSubmit(document.getElementById('game').value, document.getElementById('gameName').value, 'gragatrim', document.getElementById('users').value, this);}} >
            Submit
          </button>
        </div>
      );
    }
  }
};

export default NewGame;
