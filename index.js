import registerRootComponent from "./node_modules/expo/build/launch/registerRootComponent"

import App from './App';


import React from 'react';

//Redux
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./src/redux/reducers"

const stores = createStore(reducers,applyMiddleware(thunk));

const ReduxApp = () => (
  <Provider store={stores}>
      <App />
  </Provider>
);



registerRootComponent(ReduxApp);
