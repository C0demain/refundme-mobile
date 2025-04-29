import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Icon, TrashIcon } from "@/components/ui/icon";
import { deleteRequest, getRequestById } from "@/src/api/requestService/request";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export default function ConfirmDeleteRequest() {
  const router = useRouter();
  const { request_id } = useLocalSearchParams();
  const [requestTitle, setRequestTitle] = useState("");

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        if (typeof request_id === "string") {
          const data = await getRequestById(request_id);
          setRequestTitle(data.title);
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Erro ao carregar a solicitação",
          position: "top",
        });
      }
    };

    fetchRequest();
  }, [request_id]);

  const handleDelete = async () => {
    try {
      if (typeof request_id === "string") {
        await deleteRequest(request_id);
        Toast.show({
          type: "success",
          text1: "Sucesso!",
          text2: "Solicitação excluída com sucesso",
          position: "top",
        });
        router.replace("/requests");
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao excluir",
        text2: "Tente novamente mais tarde",
        position: "top",
      });
    }
  };

  return (
    <Box className="flex-1 items-center justify-center p-6 bg-white">
      <Box className="w-[64px] h-[64px] rounded-full bg-background-error items-center justify-center mb-6">
        <Icon as={TrashIcon} className="stroke-error-600"/>
      </Box>
      <Heading size="xl" className="text-center text-[#8a2be2] mb-3">
        Confirmar exclusão
      </Heading>
      <Text size="md" className="text-center text-gray-600 mb-6">
        Tem certeza que deseja excluir a solicitação{" "}
        <Text className="font-bold text-black">"{requestTitle}"</Text>? Esta ação não pode ser desfeita.
      </Text>
      <Box className="flex-row gap-4 w-full">
        <Button
          variant="outline"
          action="secondary"
          className="flex-1 border-gray-300"
          onPress={() => router.replace("/requests")}
        >
          <ButtonText>Cancelar</ButtonText>
        </Button>
        <Button
          className="flex-1 bg-red-600"
          onPress={handleDelete}
        >
          <ButtonText>Excluir</ButtonText>
        </Button>
      </Box>
    </Box>
  );
}
