import { useState } from "react";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Input, InputField } from "@/components/ui/input";
import { login } from "@/src/api/loginService/login";
import { useRouter } from "expo-router";
import { Button, ButtonText } from "@/components/ui/button";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await login({ email, password: senha });
      console.log("Login bem-sucedido:", response);

      
      await AsyncStorage.setItem("authToken", response.access_token);
      console.log("Token armazenado com sucesso!");

      router.push("/refund");
      
    } catch (err) {
      setError("Erro ao fazer login. Verifique suas credenciais.");
      console.error("Erro ao fazer login:", err);
    }
  };

  return (
    <Box className="flex-1 items-center justify-center p-4">
      <Text className="text-3xl font-bold text-[#8a2be2] mb-10">Login de Usuário</Text>
      {error && <Text className="text-red-500 mb-4">{error}</Text>}

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

      <Button
        className="items-center justify-center w-80 bg-[#8a2be2] rounded-lg p-3"
        onPress={handleLogin}
      >
        <ButtonText className="text-white text-sm font-bold">LOGIN</ButtonText>
      </Button>
    </Box>
  );
}
