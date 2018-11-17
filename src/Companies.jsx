import React from "react";
import * as R from "ramda";
import PouchDB from "pouchdb";


class Companies extends React.Component {
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
    this.sync();
    this.handleCancel = this.handleCancel.bind(this);
    this.handleCompanyPurchase = this.handleCompanyPurchase.bind(this);
  }

  handleCancel(event) {
    this.localDb.allDocs({ include_docs: true, attachments: true }).then(function (result) { this.setState({gameInformation: result.rows}) }.bind(this));
  }

  handleCompanyPurchase(gameInfo, companyAbbreviation, user, parValue, submitThis, event) {
    let tempData = {};
    let oldData = R.forEachObjIndexed((value, key) => R.merge(tempData, {key: value}), gameInfo.doc);
    let newUserData = R.clone(gameInfo.doc.users);
    if (R.isNil(newUserData[user].shares)) {
      newUserData[user].shares = {};
    }
    newUserData[user].shares[companyAbbreviation] = gameInfo.doc.companies[companyAbbreviation].director === "" ? 2 : (!R.isNil(newUserData[user].shares[companyAbbreviation]) ? newUserData[user].shares[companyAbbreviation] : 0) + 1;
    newUserData[user].capital = parseInt(newUserData[user].capital, 10) - (gameInfo.doc.companies[companyAbbreviation].director === "" ? parseInt(parValue, 10) * 2 : parseInt(parValue, 10));
    let newCompanyInfo = R.clone(gameInfo.doc.companies);
    newCompanyInfo[companyAbbreviation].director = gameInfo.doc.companies[companyAbbreviation].director === "" ? user : gameInfo.doc.companies[companyAbbreviation].director;
    newCompanyInfo[companyAbbreviation].parPrice = gameInfo.doc.companies[companyAbbreviation].director === "" ? parseInt(parValue, 10) : newCompanyInfo[companyAbbreviation].parPrice;
    newCompanyInfo[companyAbbreviation].sharesOwned = gameInfo.doc.companies[companyAbbreviation].director === "" ? 2 : newCompanyInfo[companyAbbreviation].sharesOwned + 1;
    let tempUpdateData = {
      _id: gameInfo.id,
      _rev: gameInfo.value.rev,
      users: newUserData,
      companies: newCompanyInfo,
    }
    let updateData = R.merge(oldData, tempUpdateData);
    if (newUserData[user].capital < 0) {
      //TODO add in some error message later on
      alert('Not enough money to purchase');
      return;
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
            <option key={'user' + i} value={R.keys(gameInfo.doc.users)[i]}>{R.keys(gameInfo.doc.users)[i]}</option>
          ),
          gameInfo.doc.users
      );
      let parValues = R.addIndex(R.map)(
        (user, i) => (
            <option key={"parValues" + i} value={R.keys(this.props.game.parValues)[i]}>{R.keys(this.props.game.parValues)[i]}</option>
          ),
          this.props.game.parValues
      );
      let userHeading = R.addIndex(R.map)(
        (user, i) => (
            <th key={"user" + i}>{R.keys(gameInfo.doc.users)[i]}</th>
          ),
          gameInfo.doc.users
      );
      let userShares = R.addIndex(R.map)(
        (company, i) => (
            R.values(R.addIndex(R.map)(
              (user, j) => (
                  <td key={"userShares" + i + j}>{!R.isNil(user.shares) ? (!R.isNil(user.shares[R.keys(gameInfo.doc.companies)[i]]) ? user.shares[R.keys(gameInfo.doc.companies)[i]] : 0) : 0}</td>
                ),
                gameInfo.doc.users
            ))
          ),
          gameInfo.doc.companies
      );
      let companyInfo = R.addIndex(R.map)(
        (companyData, i) => (
          <tr key={i}>
            <td>{companyData.name}</td>
            <td>{R.join(",", companyData.tokens)}</td>
            <td>{companyData.privates || ""}</td>
            {R.values(userShares[R.keys(gameInfo.doc.companies)[i]])}
            <td><select id={"userBuyingCompany" + i}>{R.values(userOptions)}</select><select id={'parValues' + i}>{R.values(parValues)}</select><button onClick={() => {this.handleCompanyPurchase(gameInfo, R.keys(gameInfo.doc.companies)[i], document.getElementById('userBuyingCompany' + i).value, document.getElementById('parValues' + i).value, this)}}>Buy Shares</button></td>
          </tr>
          ),
          gameInfo.doc.companies
      );
      return (
        <div style={linkStyle}>
          <table className="hoverTable" border="1">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Company Tokens</th>
                <th>Privates Owned</th>
                {R.values(userHeading)}
                <th>Buy Shares</th>
              </tr>
            </thead>
            <tbody>
              {R.values(companyInfo)}
            </tbody>
          </table>
        </div>
      );
    } else {
      return null;
    }
  }
};

export default Companies;

