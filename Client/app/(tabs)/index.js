import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CommonBtn from "../Components/CommonBtn.js"; // Import CommonBtn
import { router } from "expo-router";

export default function HomePage() {
  const handleGetStarted = () => {
    router.push("../login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heroSection}>
        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2018/05/10/11/34/concert-3387324_1280.jpg",
          }}
          style={styles.heroImage}
        />
        <Text style={styles.heroText}>
          Discover, Create, and Manage Events Effortlessly
        </Text>
      </View>

      <View style={styles.featuresContainer}>
        <Pressable style={styles.featureCard}>
          <Text style={styles.featureTitle}>Create Event</Text>
          <Text style={styles.featureDescription}>
            Start organizing your own event.
          </Text>
        </Pressable>
        <Pressable style={styles.featureCard}>
          <Text style={styles.featureTitle}>Join Event</Text>
          <Text style={styles.featureDescription}>
            Find events that match your interests.
          </Text>
        </Pressable>
        <Pressable style={styles.featureCard}>
          <Text style={styles.featureTitle}>Manage Events</Text>
          <Text style={styles.featureDescription}>
            Keep track of your events in one place.
          </Text>
        </Pressable>
      </View>

      {/* CTA using CommonBtn */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaText}>
          Ready to make your next event a success?
        </Text>
        <CommonBtn text="Get Started" onPress={handleGetStarted} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: "#f5f5f5",
  },
  heroSection: {
    alignItems: "center",
  },
  heroImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  heroText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
    color: "#333",
  },
  featuresContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  featureCard: {
    width: "30%",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    alignItems: "center",
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#6200EE",
  },
  featureDescription: {
    fontSize: 14,
    textAlign: "center",
    color: "#777",
  },
  ctaSection: {
    marginTop: 40,
    alignItems: "center",
  },
  ctaText: {
    fontSize: 20,
    textAlign: "center",
    color: "#333",
    marginBottom: 20,
  },
});
