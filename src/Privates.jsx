import React from "react";
import * as R from "ramda";
import PouchDB from "pouchdb";


class Privates extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
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
    this.handlePrivatePurchase = this.handlePrivatePurchase.bind(this);
  }

  handleCancel(event) {
    this.localDb.allDocs({ include_docs: true, attachments: true }).then(function (result) { this.setState({gameInformation: result.rows}) }.bind(this));
  }

  handlePrivatePurchase(gameInfo, privateIndex, user, submitThis, event) {
    let newUserData = R.clone(gameInfo.doc.users);
    newUserData[user].privates = {index: privateIndex, name: gameInfo.doc.privates[privateIndex].name};
    newUserData[user].capital = parseInt(newUserData[user].capital, 10) - parseInt(gameInfo.doc.privates[privateIndex].price, 10);
    let newPrivateInfo = R.clone(gameInfo.doc.privates);
    newPrivateInfo[privateIndex].owner = user;
    let updateData = {
      _id: gameInfo.id,
      _rev: gameInfo.value.rev,
      users: newUserData,
      privates: newPrivateInfo,
    }
    this.localDb.put(updateData, function callback(err, result) {
      if (!err) {
      }
    });
    if (submitThis._isMounted === true) {
      this.localDb.allDocs({ include_docs: true, attachments: true }).then(function (result) { this.setState({gameInformation: result.rows}) }.bind(this));
    }
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
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
      clear: 'right',
      'marginLeft': '5px'
    }
    if (!R.isEmpty(this.state.gameInformation)) {
      let gameInfo = this.state.gameInformation[0];
      let userOptions = R.addIndex(R.map)(
        (user, i) => (
            <option key={i} value={R.keys(gameInfo.doc.users)[i]}>{R.keys(gameInfo.doc.users)[i]}</option>
          ),
          gameInfo.doc.users
      );
      let privateInfo = R.addIndex(R.map)(
        (privateData, i) => (
          <tr key={i}>
            <td>{privateData.name}</td>
            <td>{privateData.price}</td>
            <td>{privateData.owner}</td>
            <td><select id={"userBuying" + i}>{R.values(userOptions)}</select></td>
            <td><button onClick={() => {this.handlePrivatePurchase(gameInfo, i, document.getElementById('userBuying' + i).value, this)}}>Buy Private</button></td>
          </tr>
          ),
          gameInfo.doc.privates
      );
      return (
        <div style={linkStyle}>
          <table border="1">
            <thead>
              <tr>
                <th>Private Name</th>
                <th>Private Cost</th>
                <th>Owned By</th>
                <th>Person Buying</th>
                <th>Purchase</th>
              </tr>
            </thead>
            <tbody>
              {privateInfo}
            </tbody>
          </table>
        </div>
      );
    } else {
      return null;
    }
  }
};

export default Privates;

