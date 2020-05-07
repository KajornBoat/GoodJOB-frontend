import React from "react";
import { Value } from "react-native-reanimated"
import { useSelector } from "react-redux"
import { View } from "react-native";

export const checkFirst = (user) => {
    let interested = ""
    if(user.interested.length == 0) interested = undefined;

    return ([
        user.firstname,
        user.lastname,
        user.age,
        user.phone_number,
        user.id_card,
        user.province,
        user.gender,
        interested,
    ].indexOf(undefined) > -1 )
    
    
}
