import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import Main from "./containers/Main";
import * as Reducers from "./utils/reducers";
import registerServiceWorker from "./registerServiceWorker";
import { loadState, saveState } from "./utils/localStorage";

import "./index.css";

const logger = createLogger();
const persistedState = loadState();
const rootReducer = combineReducers(Reducers);
const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(thunkMiddleware, logger)
);

store.subscribe(() => {
  saveState(store.getState());
});
ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
