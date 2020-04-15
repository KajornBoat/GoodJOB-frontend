import React from "react";
import PopUpScreen from "./PopUpScreen"
import {StyleSheet, View, Text ,ActivityIndicator} from "react-native";

const LoadingComponent = ({active,setActive}) => {
    //const [active, setActive] = useState(false);
    return (
      <PopUpScreen
        visible={active}
        onRequestClose={() => {
          setActive(false);
        }}
      >
        <View style={[{ flexDirection: "row" }, styles.popUpLoading]}>
          <ActivityIndicator size="large" />
          <Text>       Loading...</Text>
        </View>
      </PopUpScreen>
    )
  };

export default LoadingComponent;


const styles = StyleSheet.create({
  popUpLoading: {
    margin: 20,
    alignItems: "center",
  },
});