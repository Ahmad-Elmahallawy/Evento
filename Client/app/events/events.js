import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import EventsCard from "./events-card";

const events = () => {
  const [events, setEvents] = useState([]);
  return (
    <View>
      <EventsCard />
    </View>
  );
};

export default events;

const styles = StyleSheet.create({});
