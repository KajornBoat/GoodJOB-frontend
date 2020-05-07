import React from "react";
import { Value } from "react-native-reanimated"
import { useSelector } from "react-redux"
import { View } from "react-native";

export const checkFirst = (user) => {
    const condition = [undefined,""]
    return ([
        condition.indexOf(user.firstname),
        condition.indexOf(user.lastname),
        condition.indexOf(user.age),
        condition.indexOf(user.phone_number),
        condition.indexOf(user.id_card),
        condition.indexOf(user.province),
        condition.indexOf(user.gender),
        user.interested.length,
    ].indexOf(0) == -1 )
}
