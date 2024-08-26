import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import EventsCard from "./events-card";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

const events = () => {
  return (
    <SafeAreaView style={styles.container}>
      <EventsCard />
    </SafeAreaView>
  );
};

export default events;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
});
