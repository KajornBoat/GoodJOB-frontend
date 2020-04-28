import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

//Redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./src/redux/reducers";

import AuthStack, { CheckIfLoggedIn } from "./src/screens/AuthenStrack";

const stores = createStore(reducers, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={stores}>
      <CheckIfLoggedIn>
        <AuthStack />
      </CheckIfLoggedIn>
    </Provider>
  );
}
