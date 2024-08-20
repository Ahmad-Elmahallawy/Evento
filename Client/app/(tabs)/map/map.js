import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
// Import the JSON data
import locations from "../../SampleData/Locations.json";

export default function MapPage() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 34.0522, 
          longitude: -118.2437,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
      >
        {locations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.location.lat,
              longitude: location.location.lng,
            }}
          >
            <Callout>
              <View style={styles.card}>
                <Image source={{ uri: location.image }} style={styles.image} />
                <Text style={styles.title}>{location.name}</Text>
                <Text style={styles.description}>{location.description}</Text>
                <Text style={styles.address}>
                  {location.address}, {location.city}, {location.state}{" "}
                  {location.zip}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  card: {
    width: 200,
    padding: 10,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
  },
  description: {
    marginTop: 5,
    color: "#555",
  },
  address: {
    marginTop: 5,
    color: "#777",
    fontSize: 12,
  },
});
