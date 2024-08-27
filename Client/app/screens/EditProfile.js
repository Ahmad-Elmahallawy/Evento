import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    Modal,
    FlatList,
    Alert,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

// Sample list of cities
const cities = ["New York, USA", "Los Angeles, USA", "Chicago, USA", "Houston, USA", "Phoenix, USA"];

export default function EditProfile() {
    const { image, name, phoneNumber, email, location } = useLocalSearchParams();

    const [selectedImage, setSelectedImage] = useState(image);
    const [userName, setUserName] = useState(name);
    const [userPhoneNumber, setUserPhoneNumber] = useState(phoneNumber);
    const [userEmail, setUserEmail] = useState(email);
    const [userLocation, setUserLocation] = useState(location);
    const [locationModalVisible, setLocationModalVisible] = useState(false);

    const handleImageSelection = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri); // Update selected image
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^\(\d{3}\) \d{3} \d{4}$/; // Validate format (123) 456 7890
        return phoneRegex.test(phoneNumber);
    };

    const handlePhoneNumberChange = (text) => {
        // Remove non-numeric characters
        const digits = text.replace(/\D/g, '');

        if (digits.length <= 10) {
            // Format the number as (123) 456-7890
            const areaCode = digits.slice(0, 3);
            const middle = digits.slice(3, 6);
            const last = digits.slice(6, 10);

            let formatted = '';
            if (areaCode) formatted += `(${areaCode}`;
            if (middle) formatted += `) ${middle}`;
            if (last) formatted += ` ${last}`;

            setUserPhoneNumber(formatted);
        }
    };

    const handleSave = () => {
        if (!validateEmail(userEmail)) {
            Alert.alert("Invalid Email", "Please enter a valid email address.");
            return;
        }

        if (!validatePhoneNumber(userPhoneNumber)) {
            Alert.alert("Invalid Phone Number", "Please enter a valid phone number in the format (123) 456-7890.");
            return;
        }

        Alert.alert("Profile Updated", "Your profile has been successfully updated.");
    };

    const selectCity = (city) => {
        setUserLocation(city);
        setLocationModalVisible(false);
    };

    return (
        <ScrollView keyboardShouldPersistTaps='always'>
            <View style={styles.container}>
                <View style={styles.picContainer}>
                    <TouchableOpacity onPress={handleImageSelection}>
                        <Image
                            source={{ uri: selectedImage }}
                            style={styles.profilePicture}
                        />
                        <View style={styles.imageEdit}>
                            <MaterialIcons
                                name="photo-camera"
                                size={30}
                                color="#6200EE"
                            />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.imageLabel}>Edit picture</Text>
                </View>

                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    value={userName}
                    onChangeText={setUserName}
                />

                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    value={userPhoneNumber}
                    onChangeText={handlePhoneNumberChange}
                    keyboardType="phone-pad"
                    maxLength={14} // 14 characters: (123) 456-7890
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={userEmail}
                    onChangeText={setUserEmail}
                    keyboardType="email-address"
                />

                <Text style={styles.label}>Location</Text>
                <TouchableOpacity
                    style={styles.input}
                    onPress={() => setLocationModalVisible(true)}
                >
                    <Text>{userLocation}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>

                {/* Modal for selecting city */}
                <Modal
                    visible={locationModalVisible}
                    animationType="slide"
                    onRequestClose={() => setLocationModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Select City</Text>
                        <FlatList
                            data={cities}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.cityOption}
                                    onPress={() => selectCity(item)}
                                >
                                    <Text style={styles.cityText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </Modal>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    picContainer: {
        alignItems: 'center',
        marginTop: 30,
    },
    profilePicture: {
        width: 170,
        height: 170,
        borderRadius: 85,
        borderColor: "#6200EE",
        borderWidth: 3,
    },
    imageEdit: {
        position: 'absolute',
        bottom: 0,
        right: 15,
        zIndex: 9999,
    },
    imageLabel: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    input: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 20,
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        padding: 20,
        marginTop: 30,
        backgroundColor: '#f5f5f5',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    cityOption: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    cityText: {
        fontSize: 18,
        color: '#333',
    },
    saveButton: {
        backgroundColor: '#6200EE',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
