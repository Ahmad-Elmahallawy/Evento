import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import { Card, Button, Icon } from "@rneui/themed";
import formatDate from "../utils/dateFormatter";

const EventsCard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Events`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {events.map((event) => (
        <Card
          key={event.Id}
          containerStyle={styles.cardContainer}
          titleStyle={styles.cardTitle}
          dividerStyle={styles.divider}
          style={styles.card}
        >
          <Card.Title style={styles.cardTitle}>{event.title}</Card.Title>
          <Card.Divider style={styles.divider} />
          <Text style={styles.eventDescription}>
            {event.description || "Default description text."}
          </Text>
          <Card.Divider style={styles.divider} />
          <Text style={styles.eventInfo}>
            Date: {formatDate(event.date) || "Currently Unavailable"}
          </Text>
          <Text style={styles.eventInfo}>
            Maximum Capacity: {event.maximumCapacity}
          </Text>
          <Button
            icon={
              <Icon
                name="info"
                color="#ffffff"
                iconStyle={{ marginRight: 10 }}
              />
            }
            buttonStyle={styles.button}
            title="More Details"
          />
        </Card>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  cardContainer: {
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  card: {
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 8,
  },
  eventDescription: {
    fontSize: 16,
    lineHeight: 22,
    color: "#666",
    marginBottom: 8,
  },
  eventInfo: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#6200EE",
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default EventsCard;
