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
        const response = await api.get(`/requests`)
        
        // Backend está retornando [] na rota /requests/[user_id], arrumar e remover esse .filter
        const newData = response.data.filter((item: any) => item.user._id === userId)
        return newData
    }catch(e){
        console.error(e)
        throw e
    } 
}

export async function createRequest(title: string, projectId: string){
    const userId = await AsyncStorage.getItem('userId')
    try{
        const response = await api.post(`/requests`, {
            title,
            projectId,
            userId
        })

        return response.data
    }catch(e: any){
        console.error(e)
        console.log(projectId)
        throw e
    }
}