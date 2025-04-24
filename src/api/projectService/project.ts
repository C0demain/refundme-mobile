import api from "@/src/lib/api";
import Project from "@/src/types/project";

export const getAllProjects = async (): Promise<Project[]> => {
    try {
        const response = await api.get("/projects")
        console.log("esse é o certo",response.data)
        return response.data ?? []
    } catch (error) {
        return []
    }
}