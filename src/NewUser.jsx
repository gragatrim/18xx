import React from "react";
import { Redirect } from 'react-router'
import PouchDB from "pouchdb";

var localDb = new PouchDB('users');
var remoteDb = new PouchDB(process.env.REACT_APP_remotePouchDb + '/users');

class NewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(username, email, submitThis, event) {
    let user_data = {
      _id: username + "_" + email,
      created: new Date().toISOString(),
      username: username,
      email: email,
    };
    localDb.put(user_data, function callback(err, result) {
      if (err) {
          console.log('err');
          console.log(err);
        } else {
          submitThis.sync();
          submitThis.setState(() => ({
            redirect: true
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
        return (<Redirect to="/" />);
    } else {
      return (
        <div>
          Username: <input id="username" name="username" type="text" />
          Email Address: <input id="email" name="email" type="text" />
          <button onClick={() => {this.handleSubmit(document.getElementById('username').value, document.getElementById('email').value, this);}} >
            Submit
          </button>
        </div>
      );
    }
  }
};

export default NewUser;

