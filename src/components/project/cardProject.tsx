import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import Project from "@/src/types/project";
import { useState } from "react";
import { View, ActivityIndicator, Text, Image } from "react-native";
import { Box } from "@/components/ui/box";
import RequestPieChart from "@/src/components/project/RequestPieChart";
import DeleteProject from "./DeleteProject";
import { useNavigation, useRouter } from "expo-router";


interface CardProjectProps{
    project: Project;
    onDelete: () => void;
}

const CardProject: React.FC<CardProjectProps> = ({project, onDelete}) => {
    const [showAlertDialog, setShowAlertDialog] = useState(false);
    const router = useRouter()

    const handleClose = () => setShowAlertDialog(false);

    const handleDelete = () => {
        handleClose();
        onDelete();
    };

    // Calcula a soma das despesas utilizando o campo _v de cada request
    const totalExpenses = project.requests.reduce((total, request) => {
        // Somando o valor de _v de cada request, que já contém a soma das despesas
        return total + (request._v || 0);
    }, 0);

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