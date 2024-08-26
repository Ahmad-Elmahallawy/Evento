import { Button, Dialog, Input } from "@rneui/themed";
import { ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateEventDialog = ({ visible, toggleDialog }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [location, setLocation] = useState("");

  return (
    <SafeAreaView style={styles.safeArea}>
      <Dialog
        isVisible={visible}
        onBackdropPress={toggleDialog}
        overlayStyle={styles.dialogOverlay}
      >
        <Dialog.Title
          title="Create Your Event"
          titleStyle={styles.dialogTitle}
        />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Input
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
          />
          <Input
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
          />
          <Input
            placeholder="Date"
            value={date}
            onChangeText={setDate}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
          />
          <Input
            placeholder="Maximum Capacity"
            value={capacity}
            onChangeText={setCapacity}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            keyboardType="numeric"
          />
          <GooglePlacesAutocomplete
            placeholder="Location"
            minLength={2}
            onFail={(err) => console.error(err)}
            fetchDetails={true}
            textInputProps={{
              placeholderTextColor: "#777",
            }}
            listViewDisplayed="auto"
            onPress={(data, details = null) => {
              console.log("data: ", data, details);
              setLocation(data.description);
            }}
            query={{
              key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
              language: "en",
            }}
            styles={{
              container: styles.autocompleteContainer,
              textInput: styles.input,
              textInputPlaceholder: styles.placeholder,
            }}
          />
        </ScrollView>
        <Dialog.Actions>
          <Dialog.Button
            title="CONFIRM"
            onPress={() => {
              console.log(
                `Title: ${title}, Description: ${description}, Date: ${date}, Capacity: ${capacity}, Location: ${location}`
              );
              toggleDialog();
            }}
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
          />
          <Dialog.Button
            title="CANCEL"
            onPress={toggleDialog}
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
          />
        </Dialog.Actions>
      </Dialog>
    </SafeAreaView>
  );
};

export default CreateEventDialog;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  dialogOverlay: {
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  dialogTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  scrollContainer: {
    paddingHorizontal: 0,
    paddingVertical: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    width: "100%",
    
  },
  autocompleteContainer: {
    height: 40,
    marginBottom: 10,
    width: "100%",
  },
  placeholder: {
    placeholderTextColor: "#000",
  },
  button: {
    backgroundColor: "#6200EE",
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
  },
});
