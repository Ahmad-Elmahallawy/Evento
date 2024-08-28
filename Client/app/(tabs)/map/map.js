import { useLocalSearchParams } from "expo-router"; 
import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import locations from "../../SampleData/Locations.json";

export default function MapPage() {
  const coordinates  = useLocalSearchParams();
  
  const location = coordinates || { lat: 43.6532, lng: -79.3832 }; 
 

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.lat,
            longitude: location.lng,
          }}
        >
          <Callout>
            <View style={styles.card}>
              <Text style={styles.title}>Event Location</Text>
            </View>
          </Callout>
        </Marker>
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
