import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import Project from "@/src/types/project";
import { useState } from "react";
import { View, ActivityIndicator, Text, Image } from "react-native";
import { Box } from "@/components/ui/box";

interface CardProjectProps{
    project: Project;
    onDelete: () => void;
}

const CardProject: React.FC<CardProjectProps> = ({project, onDelete}) => {
    const [showAlertDialog, setShowAlertDialog] = useState(false);
    const [loadingImage, setLoadingImage] = useState(true);

    const handleClose = () => setShowAlertDialog(false);

    const handleDelete = () => {
        handleClose();
        onDelete();
    };

    return (
        <>
            <Button onPress={() => setShowAlertDialog(true)} className="flex flex-col h-min shadow-lg mx-0 bg-white items-start p-4 w-full data-[active=true]:bg-gray-200">
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
                    <Text>Limite de gastos: {project.limit}</Text>

                    <View style={{ width: 200, height: 200, alignItems: "center" }}>
                        <Text className="">Solicitações:</Text>
                        <Text>Total:</Text>
                        <Text>Pendente:</Text>
                        <Text>Aprovadas:</Text>
                        <Text>Recusadas:</Text>
                    </View>
                </AlertDialogBody>

                <AlertDialogFooter className="justify-between">
                    <Button size="sm" onPress={handleClose}>
                    <ButtonText>Fechar</ButtonText>
                    </Button>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
    </>
    )
}

export default CardProject