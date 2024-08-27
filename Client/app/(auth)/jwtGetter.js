import AsyncStorage from '@react-native-async-storage/async-storage';

const getJwt = async () => {
  try {
    const jwt = await AsyncStorage.getItem('jwt');
    return jwt;
  } catch (error) {
    console.error('Failed to retrieve JWT:', error);
  }
};

export default getJwt;