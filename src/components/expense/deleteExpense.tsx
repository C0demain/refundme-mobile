import { AlertDialog, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Box } from "@/components/ui/box";
import { ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import React from "react";
import { Button } from "@/components/ui/button";
import { Icon, TrashIcon } from "@/components/ui/icon";
import { deleteExpense } from "@/src/api/expenseService/deleteExpense";

interface DeleteExpenseProps{
    id : string;
    onDelete : () => void;
}

const DeleteExpense: React.FC<DeleteExpenseProps> = ({id, onDelete}) => {
    const [showAlertDialog, setShowAlertDialog] = React.useState(false)
    const handleClose = () => setShowAlertDialog(false)

    const handleDelete = async() => {
        try {
            const response = await deleteExpense(id)
            handleClose()
            onDelete()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        <Button onPress={() => setShowAlertDialog(true)} action="negative">
            <ButtonText>Deletar</ButtonText>
        </Button>
        <AlertDialog isOpen={showAlertDialog} onClose={handleClose}>
            <AlertDialogBackdrop />
            <AlertDialogContent className="w-full max-w-[415px] gap-4 items-center">
            <Box className="rounded-full h-[52px] w-[52px] bg-background-error items-center justify-center">
                <Icon as={TrashIcon} size="lg" className="stroke-error-500" />
            </Box>
            <AlertDialogHeader className="mb-2">
                <Heading size="md">Deletar solicitação de reembolso?</Heading>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-5">
                <Button
                size="sm"
                action="negative"
                onPress={handleDelete}
                className="px-[30px]"
                >
                <ButtonText>Excluir</ButtonText>
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

export default DeleteExpense