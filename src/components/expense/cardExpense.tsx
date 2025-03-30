import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import React, { useState } from "react";
import { ActivityIndicator, Image, View } from "react-native";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogBackdrop,
} from "@/components/ui/alert-dialog";
import { Heading } from "@/components/ui/heading";
import { formatDate } from "@/src/utils/dateFormatter";
import DeleteExpense from "./deleteExpense";

interface CardExpenseProps {
  value: number;
  type: string;
  date: string;
  description: string;
  image: string;
  id: string;
  onDelete: () => void;
}

const CardExpense: React.FC<CardExpenseProps> = ({ value, type, date, description, image, id, onDelete }) => {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [loadingImage, setLoadingImage] = useState(true);

  const handleClose = () => setShowAlertDialog(false);

  const handleDelete = () => {
    handleClose();
    onDelete();
  };

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

            <View style={{ width: 200, height: 200, justifyContent: "center", alignItems: "center" }}>
              {loadingImage && (
                <ActivityIndicator
                  size="small"
                  color="#8a2be2"
                  style={{ position: "absolute", zIndex: 1 }}
                />
              )}
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200, resizeMode: "contain" }}
                onLoadEnd={() => setLoadingImage(false)}
              />
            </View>
          </AlertDialogBody>

          <AlertDialogFooter className="justify-between">
            <DeleteExpense id={id} onDelete={handleDelete} />
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