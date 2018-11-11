import React from "react";
import * as R from "ramda";
import PouchDB from "pouchdb";


class GameInformation extends React.Component {
  constructor(props) {
    super(props);
    let values = this.props.values.gameToLoad
    let dbName = "game_information_" + values
    this.localDb = new PouchDB(dbName);
    this.remoteDb = new PouchDB(process.env.REACT_APP_remotePouchDb + dbName);
    this.state = {
      gameInformation: {},
    };
    this.localDb.allDocs({ include_docs: true, attachments: true }).then(function (result) { this.setState({gameInformation: result.rows}) }.bind(this));
    this.localDb.changes({
      since: 'now',
      live: true
    }).on('change', this.handleCancel.bind(this));
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleCancel(event) {
    this.localDb.allDocs({ include_docs: true, attachments: true }).then(function (result) { this.setState({gameInformation: result.rows}) }.bind(this));
  }

  sync() {
    let opts = {live: true};
    this.localDb.replicate.to(this.remoteDb, opts);
    this.localDb.replicate.from(this.remoteDb, opts);
  }


  render() {
    this.sync();
    const linkStyle = {
      float: 'left',
      clear: 'both',
      'marginLeft': '5px'
    }
    if (R.isNil(this.state.gameInformation) || R.isEmpty(this.state.gameInformation)) {
      return null;
    } else {
      let playerInfo = R.addIndex(R.map)(
        (player, i) => (
          <tr key={i}>
            <td>{R.keys(this.state.gameInformation[0].doc.userData)[i]}</td>
            <td>{player.capital}</td>
          </tr>
          ),
          this.state.gameInformation[0].doc.userData
      );
      return (
        <div style={linkStyle}>
          <table border="1">
            <thead>
              <tr>
                <th>Player</th>
                <th>Capital</th>
              </tr>
            </thead>
            <tbody>
              {R.values(playerInfo)}
            </tbody>
          </table>
        </div>
      );
    }
  }
};

export default GameInformation;

