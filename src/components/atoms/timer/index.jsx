import React from "react";
import { View, Text } from "react-native";
import { timerStyles } from "../timer-styles/index.jsx";

export default function Timer({ time }) {
  const formattedTime = `${Math.floor(time / 60)
    .toString()
    .padStart(2, "0")} : ${(time % 60).toString()
    .padStart(2, "0")}`;

  return (
    <View style={timerStyles.container}>
      <Text style={timerStyles.time}>{formattedTime}</Text>
    </View>
  );
}

