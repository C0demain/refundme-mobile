import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import React from "react";
import { Image } from "react-native";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogBody,
    AlertDialogBackdrop,
  } from "@/components/ui/alert-dialog"
import { Heading } from "@/components/ui/heading";
import { formatDate } from "@/src/utils/dateFormatter";
import { deleteExpense } from "@/src/api/expenseService/deleteExpense";
import { useRouter } from "expo-router";
import DeleteExpense from "./deleteExpense";

// Definindo o tipo das props que o componente vai receber
interface CardExpenseProps {
  value: number;
  type: string;
  date: string;
  description: string;
  image: string;
  id: string;
  onDelete: ()=> void;
}

const CardExpense: React.FC<CardExpenseProps> = ({ value, type, date, description, image, id, onDelete }) => {
    const [showAlertDialog, setShowAlertDialog] = React.useState(false)
    const handleClose = () => setShowAlertDialog(false)
 
    const handleDelete = () => {
        handleClose();
        onDelete();
    }

    return (
        <>
        <Button onPress={() => setShowAlertDialog(true)} className="h-min shadow-lg rounded-md bg-white">
            <Box>
                <Text>Valor: R${value}</Text>
                <Text>Tipo: {type}</Text>
                <Text>Data: {formatDate(date)}</Text>
            </Box>
        </Button>
        <AlertDialog isOpen={showAlertDialog} onClose={handleClose} size="lg">
            <AlertDialogBackdrop />
            <AlertDialogContent>
                <AlertDialogHeader>
                    <Heading className="text-typography-950 font-semibold" size="md">
                    Detalhes do reembolso
                    </Heading>
                </AlertDialogHeader>
                <AlertDialogBody className="mt-3 mb-4">
                    <Text>Valor: R${value}</Text>
                    <Text>Tipo: {type}</Text>
                    <Text>Data: {formatDate(date)}</Text>
                    <Text>Descrição: {description}</Text>
                    <Image
                    source={{ uri: image }}
                    style={{ width: 200, height: 200, resizeMode: "contain" }}
                    />

                </AlertDialogBody>
                <AlertDialogFooter className="justify-between">
                    <DeleteExpense id={id} onDelete={handleDelete}/>
                    <Button size="sm" onPress={handleClose}>
                        <ButtonText>Fechar</ButtonText>
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        </>
    );
};

export default CardExpense;
