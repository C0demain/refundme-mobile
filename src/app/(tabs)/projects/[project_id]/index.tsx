import { View, Text, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import RequestPieChart from "@/src/components/project/RequestPieChart";
import { Heading } from "@/components/ui/heading";
import { getProjectById } from "@/src/api/projectService/project";
import Project from "@/src/types/project";

const ProjectDetails = () => {
  const route = useRoute();
  const { project_id } = route.params as { project_id: string };

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);

  const getProject = async () => {
    try {
      setLoading(true);
      const data = await getProjectById(project_id);
      setProject(data);
    } catch (error) {
      console.error("Erro ao carregar projeto:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProject();
  }, []);

  if (loading || !project) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View className="p-4">
      <Heading size="xl" className="mb-4">
        Detalhes do projeto: {project.title}
      </Heading>

      <Text className="text-lg">Código: {project.code}</Text>
      <Text className="text-lg">Descrição: {project.description}</Text>
      <Text className="text-lg">Limite de gastos: R${project.limit}</Text>
      <Text className="text-lg">Nº de participantes: {project.users?.length || 0}</Text>

      <View>
        
      </View>

      <View style={{ marginTop: 10 }}>
        <RequestPieChart
          statusCounts={{
            Total: project.requests.length,
            Pendente: project.requests.filter(r => r.status === "Pendente").length,
            Aprovada: project.requests.filter(r => r.status === "Aprovada").length,
            Recusada: project.requests.filter(r => r.status === "Recusada").length,
            Rascunho: project.requests.filter(r => r.status === "Rascunho").length,
          }}
        />
      </View>
    </View>
  );
};

export default ProjectDetails;
