import api from "@/src/lib/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getProjects(){
    try{
        const response = await api.get('/projects')
        return response.data
    }catch(err){
        console.log(err)
    }
}

export async function getProjectsByUser(){
    const userId = await AsyncStorage.getItem('userId')
    try{
        const response = await api.get(`/projects/user/${userId}`)
        return response.data
    }catch(err){
        console.log(err)
    }
}