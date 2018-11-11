import React from "react";
import { Link } from "react-router-dom";
import * as R from "ramda";
import PouchDB from "pouchdb";


class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.localDb = new PouchDB('/matches');
    this.remoteDb = new PouchDB(process.env.REACT_APP_remotePouchDb + '/matches');
    this.state = {
      matches: {},
    };
    this.localDb.allDocs({ include_docs: true, attachments: true }).then(function (result) { this.setState({matches: result.rows}) }.bind(this));
    this.localDb.changes({
      since: 'now',
      live: true
    }).on('change', this.handleCancel.bind(this));
    this._isMounted = false;
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleCancel(event) {
    if (this._isMounted) {
      this.localDb.allDocs({ include_docs: true, attachments: true }).then(function (result) { this.setState({matches: result.rows}) }.bind(this));
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
      clear: 'both',
      'marginLeft': '5px'
    }
    let listOfGames = R.addIndex(R.map)(
      (match, i) => (
        <Link style={linkStyle} key={i} to={{ pathname: "/" + match.doc.gameTitle + "/upgrade/", search: "?gameToLoad=" + match.doc._id}} >{match.doc.gameName}</Link>
        ),
        this.state.matches
    );
    let returnValues = R.values(listOfGames);
    return (
      <div style={linkStyle}>
        <div>
          Matches
        </div>
        <div>
          {returnValues}
        </div>
      </div>
    );
  }
};
export default Matches;
