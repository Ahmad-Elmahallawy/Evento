import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";

const CommonBtn = (props) => {
  return (
    <Pressable style={styles.button} onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.text}</Text>
    </Pressable>
  );
};

export default CommonBtn;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#6200EE",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
