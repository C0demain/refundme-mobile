import api from "@/src/lib/api";
import Project from "@/src/types/project";

export const getAllProjects = async (search?: string): Promise<Project[]> => {
    try {
        const response = await api.get("/projects", {params: { search } })
        return response.data ?? []
    } catch (error) {
        return []
    }
}


export const getProjectById = async (id: string) => {
    try {
        console.log("solicitou")
        const response = await api.get(`/projects/${id}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        return error
    }
};


export const deleteProject = async(id:string) => {
    try {
        const response = await api.delete(`/projects/${id}`)
        if (!response || !response.data) {
            throw new Error("Resposta inválida ou sem dados");
        }

        console.log("projeto excluído com sucesso!");
    } catch (e) {
        console.error("Erro ao excluir a projeto:", e);
        throw e;
    }
}

export async function createProject(title: string, limit: number, users: string[], description: string,){
    console.log(users)
    try{
        const response = await api.post(`/projects`, {
            title,
            limit,
            users,
            description
        })

        return response.data
    }catch(e: any){
        console.error(e)
        throw e
    }
}