import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { MaterialIcons } from '@expo/vector-icons'
import { Link } from 'expo-router';

export default function UserPage() {

    // State variables for user details
  const [image, setImage] = useState("https://cdn.pixabay.com/photo/2018/05/10/11/34/concert-3387324_1280.jpg")
  const [name, setName] = useState("John Doe");
  const [phoneNumber, setPhoneNumber] = useState("(234) 567 890");
  const [email, setEmail] = useState("john.doe@example.com");
  const [location, setLocation] = useState("Los Angeles, USA");

  return (
      <View style={styles.container}>
          <StatusBar />
          <View style={styles.picContainer}>
            <Image
              source={{
                      uri: image
              }}
              resizeMode="contain"
                  style={styles.profilePicture}

            />
          </View>

          <View style={styles.detailsContainer}>
              <Text style={styles.userName}>{name}</Text>
              <Text style={styles.userDetail}>{phoneNumber}</Text>
              <Text style={styles.userDetail}>{email}</Text>
              <View style={styles.locationIcon}>
                  <MaterialIcons
                      name="location-on"
                      size={34}
                      color="black"
                  />
                  <Text style={styles.userDetail}>{location}</Text>
              </View>
          </View>

          <Link
              href={{
                  pathname: "/screens/EditProfile",
                  params: { image, name, phoneNumber, email, location }
              }}
              style={styles.editButton}
          >
              <Text style={styles.editButtonText}>Edit Profile</Text>
          </Link>

      </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
    },
    picContainer: {
        alignItems: 'center',
        marginTop: 30,
    },
    profilePicture: {
        width: 170,
        height: 170,
        borderRadius: 85,
        borderColor: '#333',
        borderWidth: 2,
    },
    detailsContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    userDetail: {
        fontSize: 18,
        color: '#777',
        marginBottom: 5,
    },
    locationIcon: {
        flexDirection: "row",
        marginVertical: 6,
        alignItems: "center",
    },
    editButton: {
        backgroundColor: '#6200EE',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
        marginTop: 30
    },
    editButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});