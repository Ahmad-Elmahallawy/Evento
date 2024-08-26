import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import EventsCard from "./eventsCard";
import { SafeAreaView } from "react-native-safe-area-context";
import CreateEventDialog from "./createEventDialog";
import { Ionicons } from "@expo/vector-icons";

const Events = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleDialog = () => {
    setIsVisible(!isVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={toggleDialog}>
          <Ionicons name="add-circle-outline" size={24} color="#6200EE" />
          <Text style={styles.buttonText}>Create Your Own Event</Text>
        </Pressable>
      </View>
      <EventsCard />
      {isVisible && (
        <CreateEventDialog visible={isVisible} toggleDialog={toggleDialog} />
      )}
    </SafeAreaView>
  );
};

export default Events;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    marginLeft: 10,
    color: "#6200EE",
    fontSize: 16,
    fontWeight: "bold",
  },
});
