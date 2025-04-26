import { useRef, useState } from "react"; 
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Input, InputField } from "@/components/ui/input";
import { login } from "@/src/api/loginService/login";
import { useRouter } from "expo-router";
import { Button, ButtonText } from "@/components/ui/button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { ActivityIndicator, TextInput, View, TouchableOpacity, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "@/src/contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {storeUser} = useAuth()

  const senhaRef = useRef<TextInput>(null);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await login({ email, password: senha });

      if (!response) throw new Error("Login falhou");

      await storeUser(response.user_id, response.access_token, response.role)

      Toast.show({
        type: "success",
        text1: "Bem vindo(a)!",
        text2: "Login realizado com sucesso.",
        position: "top",
      });

      setEmail("");
      setSenha("");

      router.push("/(tabs)/requests");
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Erro no Login!",
        text2: "Verifique o e-mail e a senha.",
        position: "top",
      });
      
      console.error(err)
      router.reload()
    } finally {
      
      setLoading(false);
    }
  };

  return (
    <Box className="flex-1 items-center justify-center p-4">
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={{ width: 300, height: 150, resizeMode: "contain" }}
        />
      </View>

      <Box className="w-80 items-start mb-4">
        <Text className="text-sm text-gray-700 mb-1">E-mail</Text>
        <Input className="w-full border border-[#8a2be2] rounded-lg">
          <InputField
            placeholder="Digite um e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            value={email}
            onChangeText={setEmail}
            contextMenuHidden={true}
            returnKeyType="next"
            onSubmitEditing={() => senhaRef.current?.focus()}
          />
        </Input>
      </Box>

      <Box className="w-80 items-start mb-4">
        <Text className="text-sm text-gray-700 mb-1">Senha</Text>
        <Input className="w-full border border-[#8a2be2] rounded-lg flex-row items-center justify-between pr-3">
          <InputField
            placeholder="Digite uma senha"
            autoCapitalize="none"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!showPassword}
            returnKeyType="done"
            onSubmitEditing={handleLogin}
            className="flex-1"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <FontAwesome name={showPassword ? "eye-slash" : "eye"} size={20} color="#888" />
          </TouchableOpacity>
        </Input>
      </Box>

      <Button
        className="items-center justify-center w-80 bg-[#8a2be2] rounded-lg p-3 mt-3"
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <ButtonText className="text-white text-sm font-bold">LOGIN</ButtonText>
        )}
      </Button>
    </Box>
  );
}
