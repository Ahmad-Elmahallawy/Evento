import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import { Card, Button } from "@rneui/themed";
import formatDate from "../utils/dateFormatter";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { SelectList } from "react-native-dropdown-select-list";

const EventsCard = () => {
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState("");
  const rsvpValues = [
    { key: "1", value: "Going" },
    { key: "2", value: "Not Going" },
    { key: "3", value: "Maybe" },
  ];

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
          <View style={styles.actionContainer}>
            <Button
              icon={<FontAwesome5 name="map-marked" size={23} color="#fff" />}
              buttonStyle={styles.button}
              title="View in Map"
              titleStyle={styles.buttonText}
            />
            <SelectList
              setSelected={(val) => setSelected(val)}
              data={rsvpValues}
              save="value"
              boxStyles={styles.selectDropdown}
              inputStyles={styles.selectDropdownText} 
              arrowStyles={styles.selectDropdownArrow} 
              dropdownStyles={styles.absoluteDropdownMenu}
              dropdownItemStyles={styles.dropdownItem}
              search={false}
              arrowicon={
                <FontAwesome5 name="chevron-down" size={16} color="#fff" />
              }
            />
          </View>
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
    backgroundColor: "#fff",
  },
  card: {
    borderRadius: 10,
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 8,
  },
  eventDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666",
    marginBottom: 8,
  },
  eventInfo: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    width: "100%", 
  },
  button: {
    backgroundColor: "#6200EE",
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 130,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    paddingLeft: 5,
  },
  selectDropdown: {
    backgroundColor: "#6200EE",
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 130,
    borderWidth: 0, 
  },
  selectDropdownText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center", 
    paddingRight: 5,
  },
  selectDropdownArrow: {
    color: "#fff", 
  },
  absoluteDropdownMenu: {
    position: "absolute", 
    top: 50, 
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 4,
    elevation: 3,
    zIndex: 1000, 
  },
  dropdownMenu: {
    backgroundColor: "#fff", 
    borderRadius: 4,
    elevation: 3,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomColor: "#E0E0E0", 
    borderBottomWidth: 1,
  },
});

export default EventsCard;
