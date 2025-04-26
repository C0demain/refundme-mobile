import { Button } from "@/components/ui/button";
import Project from "@/src/types/project";
import { Text } from "react-native";
import { Box } from "@/components/ui/box";
import { useRouter } from "expo-router";


interface CardProjectProps{
    project: Project;
    onDelete: () => void;
}

const CardProject: React.FC<CardProjectProps> = ({project, onDelete}) => {
    const router = useRouter()

    const handleDelete = () => {
        onDelete();
    };

    return (
        <>
            <Button
            onPress={() => router.push({pathname: '/projects/[project_id]', params: { project_id: project._id} })}
            className="flex flex-col h-min shadow-lg bg-white items-start p-4 data-[active=true]:bg-gray-200 mt-2 mx-2 rounded-md"
            >
            <Text>#{project.code}</Text>
            <Box className="flex flex-row justify-between w-full">
                <Text className="text-lg">Título: {project.title}</Text>
                <Text className="text-lg">Nº solicitações: {project.requests.length}</Text>
            </Box>
            </Button>
        </>
    )
}

export default CardProject