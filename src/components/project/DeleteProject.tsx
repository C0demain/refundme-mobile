import { AlertDialog, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Box } from "@/components/ui/box";
import { ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import React from "react";
import { Button } from "@/components/ui/button";
import { Icon, TrashIcon } from "@/components/ui/icon";
import { ActivityIndicator, Text } from "react-native";
import Toast from 'react-native-toast-message';
import { deleteProject } from "@/src/api/projectService/project";

interface DeleteProjectProps {
    id: string;
    onDelete: () => void;
}

const DeleteProject: React.FC<DeleteProjectProps> = ({ id, onDelete }) => {
    const [showAlertDialog, setShowAlertDialog] = React.useState(false)
    const handleClose = () => setShowAlertDialog(false)
    const [loading, setLoading] = React.useState(false);

    const handleDelete = async () => {
        try {
            setLoading(true);
            await deleteProject(id);
            handleClose();
            onDelete();

            Toast.show({
                type: 'success',
                text1: 'Sucesso!',
                text2: 'Reembolso excluído com sucesso.',
                position: 'top',
            });
        } catch (error) {
            console.error(error);

            Toast.show({
                type: 'error',
                text1: 'Erro!',
                text2: 'Não foi possível excluir o reembolso.',
                position: 'top',
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <Button className="w-28" onPress={() => setShowAlertDialog(true)} action="negative">
                <ButtonText>Deletar</ButtonText>
            </Button>
            <AlertDialog isOpen={showAlertDialog} onClose={handleClose}>
                <AlertDialogBackdrop />
                <AlertDialogContent className="w-full max-w-[415px] gap-4 items-center">
                    <Box className="rounded-full h-[52px] w-[52px] bg-background-error items-center justify-center">
                        <Icon as={TrashIcon} size="lg" className="stroke-error-500" />
                    </Box>
                    <AlertDialogHeader className="mb-2">
                        <Heading size="md">Deletar projeto?</Heading>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-5">
                        <Button
                            size="sm"
                            action="negative"
                            onPress={handleDelete}
                            className="px-[30px]"
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <ButtonText>Excluir</ButtonText>
                            )}
                        </Button>

                        <Button
                            variant="outline"
                            action="secondary"
                            onPress={handleClose}
                            size="sm"
                            className="px-[30px]"
                        >
                            <ButtonText>Cancelar</ButtonText>
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default DeleteProject