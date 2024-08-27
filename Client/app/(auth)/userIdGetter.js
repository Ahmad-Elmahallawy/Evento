import AsyncStorage from "@react-native-async-storage/async-storage";

const getUserId = async () => {
  const userId = await AsyncStorage.getItem("uid");
  console.log("here", userId);
  return userId;
};

export default getUserId;
