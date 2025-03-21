import { useState } from "react";
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from "@/components/ui/button";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Senha:", senha);
  }; 

  return (
    <Box className="flex-1 items-center justify-center p-4">
      <Text className="text-3xl font-bold text-[#8a2be2] mb-10">Login de Usuário</Text>

      <Input className="w-80 mb-4 border border-[#8a2be2] rounded-lg">
        <InputField
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          value={email}
          onChangeText={setEmail}
        />
      </Input>

      <Input className="w-80 mb-4 border border-[#8a2be2] rounded-lg">
        <InputField
          placeholder="Senha"
          secureTextEntry
          autoCapitalize="none"
          value={senha}
          onChangeText={setSenha}
        />
      </Input>

      
      <Button className="items-center justify-center  w-80 bg-[#8a2be2] rounded-lg p-3" onPress={handleLogin}>
        <ButtonText className="text-white text-sm font-bold">LOGIN</ButtonText>
      </Button>

      <TouchableOpacity onPress={() => router.push('/refund')}>
        <Text>Cadastrar Reembolso</Text>
      </TouchableOpacity>
      
    </Box>
    


  );
}
