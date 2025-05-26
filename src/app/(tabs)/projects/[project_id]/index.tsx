import { View, Text, ActivityIndicator, ListRenderItemInfo, TouchableOpacity, ScrollView } from "react-native";
import React, { useCallback, useState } from "react";
import { useRoute } from "@react-navigation/native";
import RequestPieChart from "@/src/components/project/RequestPieChart";
import { Heading } from "@/components/ui/heading";
import { getProjectById } from "@/src/api/projectService/project";
import Project from "@/src/types/project";
import Request from "@/src/types/request";
import { FlatList } from "react-native-gesture-handler";
import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";
import { Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionIcon, AccordionContent } from "@/components/ui/accordion";
import { useFocusEffect, useRouter } from "expo-router";
import StatusBadge from "@/src/components/request/StatusBadge";
import DeleteProject from "@/src/components/project/DeleteProject";

const ProjectDetails = () => {
  const route = useRoute();
  const { project_id } = route.params as { project_id: string };
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);

  const getProject = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getProjectById(project_id);
      setProject(data);
    } catch (error) {
      console.error("Erro ao carregar projeto:", error);
    } finally {
      setLoading(false);
    }
  }, [project_id]);

  useFocusEffect(
    useCallback(() => {
      getProject();
    }, [getProject])
  );

  if (loading || !project) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 32 }}>
      <Box className="p-4 bg-white">
        <Heading size="xl" className="mb-4">
          Detalhes do projeto: {project.title}
        </Heading>
        <Text className="text-lg">Código: {project.code}</Text>
        <Text className="text-lg">Descrição: {project.description}</Text>
        <Text className="text-lg">Limite de gastos: R${project.limit}</Text>
        <Text className="text-lg">Nº de participantes: {project.users?.length || 0}</Text>
      </Box>

      <Divider className="bg-gray-700 my-2" orientation="horizontal" />

      <Box className="bg-white p-4">
        <Heading size="lg">Solicitações:</Heading>

        <RequestPieChart requests={project.requests}/>

        <Accordion type="single" collapsable defaultValue={[]}>
          <AccordionItem value="requests">
            <AccordionHeader>
              <AccordionTrigger>
                <View style={{ flexDirection: "row" }}>
                  <Heading size="md">Ver Solicitações:</Heading>
                  <AccordionIcon />
                </View>
              </AccordionTrigger>
            </AccordionHeader>

            <AccordionContent>
              <FlatList
                data={project.requests}
                keyExtractor={item => item._id}
                scrollEnabled={false} // <<< aqui para não ter conflito
                renderItem={({ item }: ListRenderItemInfo<Request>) => (
                  <TouchableOpacity
                    className="flex-row m-1 justify-between items-center p-3 bg-gray-200 rounded-md"
                    onPress={() =>
                      router.push({ pathname: "/requests/[request_id]", params: { request_id: item._id } })
                    }
                  >
                    <Box className="gap-1 flex-1">
                      <Text className="text-lg">{item.title}</Text>
                      <Text className="text-gray-600 text-sm">#{item.code.toLocaleUpperCase()}</Text>
                    </Box>
                    <StatusBadge status={item.status} />
                  </TouchableOpacity>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Box>

      <Divider className="bg-gray-700 my-2" orientation="horizontal" />

      <Box className="p-4 bg-white">
        <Accordion type="single" collapsable defaultValue={[]}>
          <AccordionItem value="participants">
            <AccordionHeader>
              <AccordionTrigger>
                <View style={{ flexDirection: "row" }}>
                  <Heading size="md">Ver participantes:</Heading>
                  <AccordionIcon />
                </View>
              </AccordionTrigger>
            </AccordionHeader>

            <AccordionContent>
              <FlatList
                data={project.users}
                keyExtractor={item => item._id}
                scrollEnabled={false} // <<< aqui também para não ter conflito
                renderItem={({ item }: ListRenderItemInfo<{ _id: string; name: string; email: string }>) => (
                  <Box className="justify-between m-1 bg-gray-200 rounded-md p-2">
                    <Text>Nome: {item.name}</Text>
                    <Text>Email: {item.email}</Text>
                  </Box>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Box>

      <Divider className="bg-gray-700 my-2" orientation="horizontal" />

    </ScrollView>
  );
};

export default ProjectDetails;
