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

export async function getRequestsByUser(search?: string, status?: string): Promise<Request[]>{
    const userId = await AsyncStorage.getItem('userId')
    let statusFilter = status
    if(statusFilter && statusFilter.trim() === ""){
        statusFilter = undefined
    }
    try{
        const response = await api.get(`/requests/user/${userId}`, {params: { search, status: statusFilter } })

        return response.data
    }catch(e){
        console.error(e)
        throw e
    } 
}

export async function getRequestById(id: string): Promise<Request | null>{
    try{
        const response = await api.get(`/requests/${id}`)
        return response.data
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

export async function updateRequestById(id: string, payload: any) {
    return await api.patch(`/requests/${id}`, payload); 
  }