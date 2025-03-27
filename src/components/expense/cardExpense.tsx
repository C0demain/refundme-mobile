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

// Definindo o tipo das props que o componente vai receber
interface CardExpenseProps {
  value: number;
  type: string;
  date: string;
  description: string;
  image: string;
}

const CardExpense: React.FC<CardExpenseProps> = ({ value, type, date, description, image }) => {
    const [showAlertDialog, setShowAlertDialog] = React.useState(false)
    const handleClose = () => setShowAlertDialog(false)

    return (
        <>
        <Button onPress={() => setShowAlertDialog(true)} className="w-1/2 h-min m-1 shadow-lg rounded-md bg-white">
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
                    <Image source={{ uri:image}} alt="Imagem do gasto" />
                </AlertDialogBody>
                <AlertDialogFooter className="">
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
