import api from "@/src/lib/api";

export default async function getProjects(){
    const response = await api.get('/projects')
    return response.data
}