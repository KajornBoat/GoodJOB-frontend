import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity,Button ,Alert} from "react-native";
import SettingScreen from "./SettingUserScreen"
import { useDispatch, useSelector } from "react-redux";
import { setAvailable } from "../redux/actions/pagestatus.action";
import { checkFirst } from "../utils/checkUser";

export default () => {
    const user = useSelector(({ userReducer }) => userReducer);
    const dispatch = useDispatch()
    React.useEffect(()=> {
        Alert.alert(
            'กรุณากรอกข้อมูล ',
            'กรอกข้อมูลส่วนตัวกันก่อนเข้าใช้เเอพน้า',
            [
              {text: 'OK'},
            ],    
          );
    })
    return(
        <View style={{ flex: 1 }}>
             <View style={{ flex: 11 }}>
                 <SettingScreen/>
             </View>
             <Button title="Next" onPress={() => {
                 if(!checkFirst(user)){
                    Alert.alert(
                        'Error ',
                        'กรุณากรอกข้อมูลที่เป็น *',
                        [
                          {text: 'OK'},
                        ],    
                      );
                 }
                else{
                    dispatch(setAvailable())
                }
                 
                }}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      backgroundColor: "white",
    },
});