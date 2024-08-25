import React, { useState } from "react";
import { View, Text, TextInput, Image, StyleSheet } from "react-native";
import { auth } from "../config/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import CommonBtn from "../Components/CommonBtn";
import { router } from "expo-router";
import { getRegistrationErrorMessage } from "./ErrorMsgs";

export default function RegistrationPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    setError(""); 

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: username,
        })
          .then(() => {
            console.log("Username updated");
            router.push("../(tabs)"); 
          })
          .catch((profileError) => {
            console.log("Profile update error:", profileError.message);
            setError("Failed to update profile. Please try again.");
          });
      })
      .catch((error) => {
        const errorMessage = getRegistrationErrorMessage(error.code); 
        console.log(error.code, error.message);
        setError(errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/EventoLogo.png")}
          style={styles.logo}
        />
      </View>

      <Text style={styles.title}>Create An Account To Get Started</Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#888"
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#888"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#888"
        style={styles.input}
        secureTextEntry
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <CommonBtn text="Register" onPress={handleRegister} />

      <Text style={styles.loginLink} onPress={() => router.push("./login")}>
        Have an account? <Text style={styles.loginText}>Login</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    backgroundColor: "#f5f5f5",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#6200EE",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
    color: "#333",
    fontSize: 16,
  },
  errorText: { 
    color: "red",
    textAlign: "center",
    marginBottom: 20,
    fontSize: 14,
  },
  loginLink: {
    textAlign: "center",
    color: "#777",
    marginTop: 20,
    fontSize: 14,
  },
  loginText: {
    color: "#6200EE",
    fontWeight: "bold",
  },
});