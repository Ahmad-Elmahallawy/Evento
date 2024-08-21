import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { MaterialIcons } from '@expo/vector-icons'

export default function UserPage() {

  // State variables for user details
  const [name, setName] = useState("John Doe");
  const [phoneNumber, setPhoneNumber] = useState("+1 234 567 890");
  const [email, setEmail] = useState("john.doe@example.com");
  const [location, setLocation] = useState("Los Angeles, USA");
  return (
      <View style={styles.container}>
          <StatusBar />
          <View style={styles.picContainer}>
            <Image
              source={{
                      uri: "https://cdn.pixabay.com/photo/2018/05/10/11/34/concert-3387324_1280.jpg"
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

          <TouchableOpacity style={styles.editButton} /*onPress={() => alert('Edit Profile')}*/>
              <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>





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
        width: 155,
        height: 155,
        borderRadius: 999,
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
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 30,
    },
    editButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});