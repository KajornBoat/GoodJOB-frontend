import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

//Redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./src/redux/reducers";

import AuthStack from "./src/screens/AuthenStrack";

const stores = createStore(reducers, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={stores}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
