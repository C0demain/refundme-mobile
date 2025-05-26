import { Box } from "@/components/ui/box"
import { Heading } from "@/components/ui/heading"
import { SearchIcon } from "@/components/ui/icon"
import { Input, InputSlot, InputIcon, InputField } from "@/components/ui/input"
import { getAllProjects } from "@/src/api/projectService/project"
import CardProject from "@/src/components/project/cardProject"
import Project from "@/src/types/project"
import { useRouter, useFocusEffect } from "expo-router"
import React, { useCallback, useEffect, useState } from "react"
import { FlatList, RefreshControl, Text } from "react-native"

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [searchText, setSearchText] = useState("")
    const [refreshing, setRefreshing] = useState(false)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    const getProjects = async () => {
        try {
            setLoading(true)
            const response = await getAllProjects(1,50,searchText)
            setProjects(response.data ?? [])
        } catch (error) {
            console.error("Erro ao listar projetos")
        } finally {
            setLoading(false)
        }
    }

    const refreshProjects = useCallback(() => {
        setRefreshing(true)
        getProjects().then(() => setRefreshing(false))
    }, [searchText])

    useEffect(() => {
        getProjects()
    }, [searchText])

    useFocusEffect(
        useCallback(() => {
            getProjects()
        }, [searchText])
    )

    return (
        <Box className="flex-auto w-screen">
            <Box className="bg-white m-2 rounded-md p-4 shadow-black">
                <Heading size="2xl" className="mb-2">Projetos</Heading>

                <Input className="w-5/6 mx-auto border border-[#8a2be2]">
                    <InputSlot className="p-2">
                        <InputIcon as={SearchIcon} />
                    </InputSlot>
                    <InputField
                        placeholder="Procurar por nome ou código..."
                        value={searchText}
                        onChangeText={v => setSearchText(v)}
                    />
                </Input>
            </Box>
            {loading ? (
                <Text className="text-center mt-4">Carregando projetos...</Text>
            ) : (
                <FlatList
                    data={projects}
                    keyExtractor={(item) => item._id}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={refreshProjects} />
                    }
                    contentContainerStyle={{ paddingBottom: 20 }}
                    renderItem={({ item }) => (
                        <CardProject project={item} onDelete={getProjects} />
                    )}
                    ListEmptyComponent={
                        <Text className="text-center mt-4">Nenhum projeto encontrado.</Text>
                    }
                />
            )}
        </Box>
    )
}
