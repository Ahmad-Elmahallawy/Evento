import { View, Text } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: () => <Entypo name="home" size={29} color="#6200EE" />,
        }}
      />
      <Tabs.Screen
        name="map/map"
        options={{
          tabBarIcon: () => (
            <FontAwesome5 name="map-marked" size={29} color="#6200EE" />
          ),
        }}
      />
      <Tabs.Screen
        name="user/[id]"
        options={{
          tabBarIcon: () => (
            <FontAwesome name="user" size={29} color="#6200EE" />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
