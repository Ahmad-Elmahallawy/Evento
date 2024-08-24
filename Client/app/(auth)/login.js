import React, { useState } from "react";
import { View, Text, TextInput, Image, StyleSheet } from "react-native";
import { auth } from "../config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import CommonBtn from "../Components/CommonBtn";
import { router } from "expo-router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push("../(tabs)");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // Handle errors
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

      <Text style={styles.title}>Welcome Back!</Text>

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

      <Text style={styles.forgotPassword}>Forgot your password?</Text>

      <CommonBtn text="Login" onPress={handleLogin} />

      <Text
        style={styles.signupText}
        onPress={() => router.push("./registration")}
      >
        Don't have an account? <Text style={styles.signupLink}>Sign Up</Text>
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
  forgotPassword: {
    textAlign: "right",
    color: "#6200EE",
    marginBottom: 20,
    fontSize: 14,
  },
  signupText: {
    textAlign: "center",
    color: "#777",
    marginTop: 20,
    fontSize: 14,
  },
  signupLink: {
    color: "#6200EE",
    fontWeight: "bold",
  },
});
