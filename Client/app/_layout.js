import React, { useEffect, useState } from "react";
import { auth } from "./config/firebaseConfig"; // Import Firebase auth
import { onAuthStateChanged } from "firebase/auth";
import { Stack, router } from "expo-router";

const _layout = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        router.push("/(tabs)");
        router.push("/(auth)/login");
      }
    });

    return unsubscribe;
  }, []);

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
    </Stack>
  );
};

export default _layout;
