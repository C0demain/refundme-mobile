import { Box } from "@/components/ui/box";
import { getAllProjects } from "@/src/api/projectService/project";
import CardProject from "@/src/components/project/cardProject";
import Project from "@/src/types/project";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

export default function Projects () {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true); 
    const router = useRouter();
    
    const getProjects = async () => {
        try {
            setLoading(true);
            const response = await getAllProjects();
            console.log(response);
            setProjects(response ?? []);
        } catch (error) {
            console.error("Erro ao listar projetos");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <Box>
            {loading ? (
                <Text>Carregando projetos...</Text>
            ) : (
                <>
                    {projects.length === 0 ? (
                        <Text>Nenhum projeto encontrado.</Text>
                    ) : (
                        projects.map((e, index) => (
                            <CardProject key={index} project={e} onDelete={getProjects} />
                        ))
                    )}
                </>
            )}
        </Box>
    );
}
