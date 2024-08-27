import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const CreateEventForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSubmit = () => {
    onSubmit({
      title,
      description,
      date,
      location: selectedLocation,
      capacity,
    });
  };

  return (
    <ScrollView keyboardShouldPersistTaps="always" style={styles.formContainer}>
      <KeyboardAwareScrollView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
        contentContainerStyle={styles.formContainer}
        extraScrollHeight={5} // Adjust this value to control how much the view scrolls up
      >
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
        <DateTimePicker
          value={date}
          mode="datetime"
          display="default"
          onChange={(event, selectedDate) => setDate(selectedDate || date)}
          style={styles.datePicker}
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
        <Button title="Submit Event" onPress={handleSubmit} />
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginVertical: 20,
    padding: 20,
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
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

export default CreateEventForm;
