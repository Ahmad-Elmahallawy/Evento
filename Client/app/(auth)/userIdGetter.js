import AsyncStorage from "@react-native-async-storage/async-storage";

const getUserId = async () => {
  const userId = await AsyncStorage.getItem("uid");
  return userId;
};

export default getUserId;
