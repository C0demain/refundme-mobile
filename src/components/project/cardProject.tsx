import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import Project from "@/src/types/project";
import { useState } from "react";
import { View, ActivityIndicator, Text, Image } from "react-native";
import { Box } from "@/components/ui/box";
import RequestPieChart from "@/src/components/project/RequestPieChart";
import DeleteProject from "./DeleteProject";


interface CardProjectProps{
    project: Project;
    onDelete: () => void;
}

const CardProject: React.FC<CardProjectProps> = ({project, onDelete}) => {
    const [showAlertDialog, setShowAlertDialog] = useState(false);

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
            <Button onPress={() => setShowAlertDialog(true)} className="flex flex-col h-min shadow-lg bg-white items-start p-4 data-[active=true]:bg-gray-200 mt-2 mx-2 rounded-md">
                <Text>#{project.code}</Text>
                <Box className="flex flex-row justify-between w-full">
                    <Text className="text-lg">Título: {project.title}</Text>
                    <Text className="text-lg">Nº solicitações: {project.requests.length}</Text>
                </Box>
            </Button>

            <AlertDialog isOpen={showAlertDialog} onClose={handleClose} size="lg">
                <AlertDialogBackdrop />
                <AlertDialogContent>
                <AlertDialogHeader>
                    <Heading className="text-typography-950 font-semibold" size="md">
                    Detalhes do projeto: {project.title}
                    </Heading>
                </AlertDialogHeader>

                <AlertDialogBody className="mt-3 mb-4">
                    <Text>Código: {project.code}</Text>
                    <Text>Descrição: {project.description}</Text>
                    <Text>Limite de gastos: R${project.limit}</Text>
                    <Text>Nº de participantes: {project.users ? project.users.length : 0}</Text>
                    <Text>Soma dos valores das solicitações: {totalExpenses.toFixed(2)}</Text>

                    <View style={{ width: 200, marginTop: 10}}>
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
                </AlertDialogBody>

                <AlertDialogFooter className="justify-between">
                    <Button size="sm" onPress={handleClose}>
                    <ButtonText>Fechar</ButtonText>
                    </Button>
                    <DeleteProject id={project._id} onDelete={handleDelete}/>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
    </>
    )
}

export default CardProject