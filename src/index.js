import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
require('events').EventEmitter.defaultMaxListeners = 100;

require('dotenv').config()
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
