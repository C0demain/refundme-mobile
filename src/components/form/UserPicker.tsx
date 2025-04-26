import { Box } from "@/components/ui/box";
import { FormControl, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { getAllUsers } from "@/src/api/userService/user";
import { user } from "@/src/types/user";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";

interface UserPickerProps {
    selectedUsers: string[];
    setSelectedUsers: React.Dispatch<React.SetStateAction<string[]>>;
  }
  

export default function UserPicker({ selectedUsers, setSelectedUsers }: UserPickerProps) {
  const [allUsers, setAllUsers] = useState<user[]>([]); // Lista de todos os usuários buscados
  const [search, setSearch] = useState(""); // Valor do campo de busca

  // Efeito para buscar usuários sempre que o campo de busca mudar
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers(search); // Busca os usuários na API com o filtro de busca
      setAllUsers(users); // Atualiza a lista exibida
    };

    fetchUsers();
  }, [search]);

  // Adiciona ou remove um usuário da lista de selecionados
  const toggleUser = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId) // Se já está selecionado, remove
        : [...prev, userId]                // Se não está, adiciona
    );
  };

  return (
    <Box className="w-full">
      {/* Campo de busca */}
      <FormControl>
        <FormControlLabel>
          <FormControlLabelText>Buscar usuários</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            size="6xl"
            placeholder="Buscar por nome ou e-mail"
            value={search}
            onChangeText={setSearch}
          />
        </Input>
      </FormControl>

      {/* Lista de usuários */}
      <FlatList
        data={allUsers} // Lista de usuários filtrados
        keyExtractor={(item) => item._id} // ID único para cada item
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => toggleUser(item._id)} // Seleciona/deseleciona ao tocar
            className={`p-2 border-b ${
              selectedUsers.includes(item._id) ? "bg-violet-200" : "bg-white"
            }`} // Destaca os selecionados com fundo violeta
          >
            <Text>{item.name} ({item.email})</Text>
          </TouchableOpacity>
        )}
        style={{ maxHeight: 200 }} // Limita a altura da lista
      />
    </Box>
  );
}
