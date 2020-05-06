import React, { useState, Component } from "react";
import {
  Platform,
  Alert,
  TextInput,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  Picker,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";

const CommentBox = (props) => {
  const [hide, setHide] = useState(true);
  return (
    <View style={{ marginBottom: 15 }}>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 15,
        }}
      >
        <Avatar
          size="medium"
          rounded
          source={{
            uri: props.url,
          }}
        />
        <View
          style={{
            paddingLeft: 10,
            marginRight: "15%",
          }}
        >
          <View
            style={{
              backgroundColor: "#afd9ff",
              padding: 8,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{props.commenter}</Text>
            <Text>{props.content}</Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              setHide(!hide);
            }}
          >
            <Text
              style={{ marginHorizontal: 10, fontSize: 12, fontWeight: "bold" }}
            >
              ตอบกลับ
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {hide || <ReplyBox replyer={props.replyer} reply={props.reply} />}
    </View>
  );
};

const ReplyBox = ({ replyer, reply }) => {
  const [replyText, setReplyText] = useState("");
  return replyer != undefined ? (
    <View
      style={{
        flexDirection: "row",
        marginLeft: "20%",
        marginVertical: 10,
        paddingHorizontal: 15,
      }}
    >
      <Avatar
        size="small"
        rounded
        source={{
          uri:
            "https://drive.google.com/uc?id=10KxXNBYgwiTGCmYdl-h3rUpn_7isA0rT",
        }}
      />
      <View style={{ paddingLeft: 10, marginRight: "13%" }}>
        <View
          style={{
            padding: 8,
            backgroundColor: "#afd9ff",
            borderRadius: 10,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>{replyer}</Text>
          <Text>{reply}</Text>
        </View>
      </View>
    </View>
  ) : (
    <View
      style={{
        flexDirection: "row",
        padding: 10,
        paddingRight: 5,
        flex: 1,
        marginLeft: "20%",
      }}
    >
      <TextInput
        onChangeText={(text) => setReplyText(text)}
        value={replyText}
        style={{
          height: 40,
          backgroundColor: "white",
          flex: 6,
          borderRadius: 8,
          padding: 5,
          borderWidth: 0.5,
          borderColor: "gray",
          marginRight: 5,
        }}
        maxLength={100}
      />
      <TouchableOpacity
        onPress={() => {
          if (replyText.length > 0) {
            alert(replyText);
            setReplyText("");
          }
        }}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <MaterialIcons
          name="send"
          style={{
            color: "#567091",
          }}
          size={28}
        />
      </TouchableOpacity>
    </View>
  );
};

export default function CommentScreen({ route }) {
  const comment = [];
  const [commentText, setCommentText] = useState("");
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#567091",
          padding: 10,
          paddingRight: 0,
        }}
      >
        <TextInput
          onChangeText={(text) => setCommentText(text)}
          value={commentText}
          style={{
            height: 40,
            backgroundColor: "white",
            flex: 6,
            borderRadius: 8,
            padding: 5,
          }}
          maxLength={100}
        />
        <TouchableOpacity
          onPress={() => {
            if (commentText.length > 0) {
              alert(commentText);
              setCommentText("");
            }
          }}
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <MaterialIcons
            name="send"
            style={{
              color: "white",
            }}
            size={28}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 11,
          backgroundColor: "white",
        }}
      >
        <KeyboardAvoidingView>
          <ScrollView>
            <View style={{ marginTop: 15 }}>
              {
                //commentArray
                comment.map((v, i) => (
                  <CommentBox
                    key={i}
                    id={v.id}
                    content={v.content}
                    reply={v.reply}
                    commenter={v.commenter}
                    replyer={v.replyer}
                    url={v.url}
                  />
                ))
              }
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}
