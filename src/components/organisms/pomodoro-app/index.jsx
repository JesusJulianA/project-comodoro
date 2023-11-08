// /src/components/organisms/PomodoroApp.js
import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Platform } from "react-native";
import Header from "../../molecules/header/index";
import Timer from "../../atoms/timer/index";
import { Audio } from "expo-av";
import { pomodoroAppStyles } from "../pomodoro-styles/index";

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

export default function PomodoroApp() {
  const [isWorking, setIsWorking] = useState(true);
  const [time, setTime] = useState(60 * 25); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (time === 0) {
      setIsActive(false);
      setIsWorking(!isWorking);
      setTime(isWorking ? 300 : 1500);
      playSound();
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const handleStartStop = () => {
    playSound();
    setIsActive((prev) => !prev);
  };

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../../../assets/pick-92276.mp3")
    );
    await sound.playAsync();
  }

  return (
    <SafeAreaView
      style={[pomodoroAppStyles.container, { backgroundColor: colors[currentTime] }]}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
          paddingTop: Platform.OS == "android" && 30,
        }}
      >
        <Text style={{ fontSize: 32, fontWeight: "bold", color: "#333333"}}>
          Pomodoro
        </Text>
        <Header
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />
        <Timer time={time} />
        <TouchableOpacity style={pomodoroAppStyles.button} onPress={handleStartStop}>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {isActive ? "STOP" : "START"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
