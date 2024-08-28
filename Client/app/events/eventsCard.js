import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import { Card, Button } from "@rneui/themed";
import formatDate from "../utils/dateFormatter";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { SelectList } from "react-native-dropdown-select-list";
import { useRouter } from "expo-router";
import Geocoder from "react-native-geocoding";

const EventsCard = () => {
  const router = useRouter();
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

  Geocoder.init(process.env.EXPO_PUBLIC_GOOGLE_API_KEY);

  // Search by address
  const getCoordinates = async (address) => {
    console.log(address);

    try {
      const response = await Geocoder.from(address);
      if (response.status === "ZERO_RESULTS") {
        console.warn("No results found for the provided address.");
        return null;
      }
      const location = response.results[0].geometry.location;
      return location;
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  };

  // const getCoordinates = async (address) => {
  //   const apiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
  //   const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
  //     address
  //   )}&key=${apiKey}`;

  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();

  //     if (data.status === "OK") {
  //       const { lat, lng } = data.results[0].geometry.location;
  //       console.log("success", lat, lng);
  //       return { lat, lng };
  //     } else {
  //       console.log(data.status);

  //       throw new Error("Geocoding failed");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching coordinates:", error);
  //     return null;
  //   }
  // };

  const handleViewInMap = async (address) => {
    const defaultCoordinates = { lat: 43.6532, lng: -79.3832 }; // Toronto, Canada
    const coordinates = address
      ? await getCoordinates(address)
      : defaultCoordinates;
    console.log("line 87",coordinates);

    router.push({ pathname: "../(tabs)/map/map", params: coordinates });
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
            Maximum Capacity: {event.maximumCapacity}
          </Text>
          <Text style={styles.eventInfo}>
            Date: {formatDate(event.date) || "Currently Unavailable"}
          </Text>
          <Text style={styles.eventInfo}>Location: {event.location}</Text>
          <View style={styles.attendees}>
            <Text>Going:</Text>
            <Text>Not Going:</Text>
            <Text>Maybe:</Text>
          </View>
          <View style={styles.actionContainer}>
            <Button
              icon={<FontAwesome5 name="map-marked" size={23} color="#fff" />}
              buttonStyle={styles.button}
              title="View in Map"
              titleStyle={styles.buttonText}
              onPress={() => handleViewInMap(event.location)}
            />
            <SelectList
              setSelected={(val) => setSelected(val)}
              data={rsvpValues}
              save="value"
              boxStyles={styles.selectDropdown}
              inputStyles={styles.selectDropdownText}
              arrowStyles={styles.selectDropdownArrow}
              dropdownStyles={styles.dropdownMenu}
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
    marginBottom: 16,
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
  dropdownMenu: {
    backgroundColor: "#fff",
    borderRadius: 4,
    elevation: 3,
    zIndex: 1000,
    marginTop: 5,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomColor: "#E0E0E0",
    borderBottomWidth: 1,
  },
  attendees: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
});

export default EventsCard;
