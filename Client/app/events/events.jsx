import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Button,
  TextInput,
} from "react-native";
import EventsCard from "./eventsCard";
import DateTimePicker from "@react-native-community/datetimepicker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import CommonBtn from "../Components/CommonBtn";
import getJwt from "../(auth)/jwtGetter";
import getUserId from "../(auth)/userIdGetter";

const EventsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

  const toggleForm = () => setShowForm(!showForm);

  const createEvent = async () => {
    try {
      const userId = await getUserId();
      const jwt = await getJwt()
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/Events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`, 
          },
          body: JSON.stringify({
            title,
            description,
            date,
            location: selectedLocation?.description,
            userId,
            currentCapacity: 0,
            maximumCapacity: parseInt(capacity),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Event Created", data);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.pageContainer}
      keyboardShouldPersistTaps="always"
    >
      <CommonBtn text="Create Event" onPress={toggleForm} />
      {showForm && (
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Create a New Event</Text>
          <TextInput
            placeholder="Title"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            placeholder="Description"
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <ScrollView
            keyboardShouldPersistTaps="always"
            style={styles.autocompleteWrapper}
          >
            <GooglePlacesAutocomplete
              placeholder="Location"
              minLength={2}
              fetchDetails={true}
              listViewDisplayed={false}
              onPress={(data, details = null) => {
                setLocation(data.description); 
                setSelectedLocation({
                  description: data.description,
                  details: details, 
                });
              }}
              query={{
                key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
                language: "en",
              }}
              styles={{
                textInput: styles.input,
                listView: { zIndex: 1 }, 
              }}
              disableScroll={true}
            />
          </ScrollView>
          <TextInput
            placeholder="Maximum Capacity"
            style={styles.input}
            keyboardType="numeric"
            value={capacity}
            onChangeText={setCapacity}
          />
          <CommonBtn text="Submit Event" onPress={createEvent} />
        </View>
      )}
      <EventsCard />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  formContainer: {
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "#fff",
    padding: 16,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  datePicker: {
    marginVertical: 10,
  },
  autocompleteWrapper: {
    zIndex: 2, 
  },
});

export default EventsPage;
