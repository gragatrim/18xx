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
    this.game = games[this.props.match.params.game];
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(game, gameName, user, users, submitThis, event) {
    let game_data = {
      _id: gameName + "_" + user,
      created: new Date().toISOString(),
      game: games[game],
      gameTitle: games[game].info.title,
      users: R.split(',', users),
      gameName: gameName,
    };
    localDb.put(game_data, function callback(err, result) {
      if (err) {
          console.log('err');
          console.log(err);
        } else {
          submitThis.sync();
          submitThis.setState(() => ({
            redirect: true,
            gameToLoad: games[game].info.title,
            gameNameToLoad: gameName
          }));
        }
    });
  }

  sync() {
    let opts = {live: true};
    localDb.replicate.to(remoteDb, opts);
    localDb.replicate.from(remoteDb, opts);
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
