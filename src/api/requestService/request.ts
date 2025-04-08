import api from "@/src/lib/api";
import Request from "@/src/types/request";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getRequests(): Promise<Request[]>{
    try{
        const response = await api.get('/requests')
        return response.data
    }catch(e){
        console.error(e)
        throw e
    } 
}

export async function getRequestsByUser(): Promise<Request[]>{
    const userId = await AsyncStorage.getItem('userId')
    try{
        const response = await api.get(`/requests/user/${userId}`)
        return response.data
    }catch(e){
        console.error(e)
        throw e
    } 
}