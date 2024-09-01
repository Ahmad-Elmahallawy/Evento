import React, { useEffect, useState } from "react";
import { auth } from "./config/firebaseConfig"; // Import Firebase auth
import { onAuthStateChanged } from "firebase/auth";
import { Stack, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const _layout = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        router.push("/(tabs)");
      } else {
        router.push("/(auth)/login");
      }
    });

    return unsubscribe;
  }, [router]);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#6200EE",
        },
        headerTitleStyle: {
          fontSize: 28,
          fontWeight: "bold",
          color: "#f5f5f5",
        },
        headerTitleAlign: "center",
        headerTitle: "Evento",
        headerBackTitleVisible: false,
        headerTintColor: "#f5f5f5",
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)/login" />
    </Stack>
  );
};

export default _layout;
