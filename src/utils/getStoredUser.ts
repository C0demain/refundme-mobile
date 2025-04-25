import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function getStoredUser(){
    const userId = await AsyncStorage.getItem('userId');
    const role = await AsyncStorage.getItem('role');
    console.log(role)

    return {
        userId,
        role
    }
}