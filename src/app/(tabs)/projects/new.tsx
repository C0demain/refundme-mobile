import { useState } from "react";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { createProject } from "@/src/api/projectService/project"; // ajuste o caminho se necessário
import UserPicker from "@/src/components/form/UserPicker"; // componente criado anteriormente

export default function NewProject() {
  const [title, setTitle] = useState("");
  const [limit, setLimit] = useState("");
  const [description, setDescription] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await createProject(title, Number(limit), selectedUsers, description);
      Toast.show({
        type: 'success',
        text1: 'Projeto criado com sucesso',
        position: 'top'
      });
      // Redirecionar ou limpar o formulário
      router.push("/projects"); // ajuste para a rota correta
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao criar projeto',
        text2: 'Verifique os dados e tente novamente.',
        position: 'top'
      });
    }
  };

  return (
    <Box className="flex-1 items-center justify-center p-4 bg-white">
      <Heading size="2xl" className="text-[#8a2be2] py-4">Novo Projeto</Heading>

      <Box className="w-full gap-4">
        {/* Campo Título */}
        <FormControl isRequired>
          <FormControlLabel>
            <FormControlLabelText>Título</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              placeholder="Título do projeto"
              value={title}
              onChangeText={setTitle}
            />
          </Input>
        </FormControl>

        {/* Campo Limite */}
        <FormControl isRequired>
          <FormControlLabel>
            <FormControlLabelText>Limite</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              placeholder="Limite de gastos"
              keyboardType="numeric"
              value={limit}
              onChangeText={setLimit}
            />
          </Input>
        </FormControl>

        {/* Campo Descrição */}
        <FormControl isRequired>
          <FormControlLabel>
            <FormControlLabelText>Descrição</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              placeholder="Descrição do projeto"
              multiline
              value={description}
              onChangeText={setDescription}
            />
          </Input>
        </FormControl>

        {/* Seletor de Usuários */}
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText>Usuários participantes</FormControlLabelText>
          </FormControlLabel>
          <UserPicker
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
          />
        </FormControl>

        {/* Botão de Submissão */}
        <Button onPress={handleSubmit} className="bg-[#8a2be2] rounded-md mt-4">
          <ButtonText className="text-white font-bold">Criar Projeto</ButtonText>
        </Button>
      </Box>
    </Box>
  );
}
