import React from "react";
import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import CommonBtn from "../Components/CommonBtn";
import { router } from "expo-router";

export default function RegistrationPage(props) {
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
        placeholderTextColor="#888"
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="#888"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#888"
        style={styles.input}
        secureTextEntry
      />

      <CommonBtn
        text="Register"
        onPress={() => /* TODO: we need to add function for proper authentication here*/ {}}
      />

      <Text style={styles.loginLink} onPress={() => router.push("./registration")}>
        Have an account? <Text style={styles.signupLink}>Login</Text>
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
  loginLink: {
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
