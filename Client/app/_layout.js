import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#6200EE",
        },
        headerTitleStyle: {
          fontSize: 28,
          fontWeight: "bold",
          color: "#f5f5f5"
        },
        headerTitleAlign: "center",
        headerTitle: "Evento",
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};

export default _layout;
