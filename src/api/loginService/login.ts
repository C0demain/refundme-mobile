import axios from "axios";
import Toast from "react-native-toast-message";

interface LoginRequest {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginRequest) => {
  try {
    const response = await axios.post(
      "http://api-5semestre.ddns.net:3000/auth/login",
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    if (!response.data || !response.data.access_token || !response.data.user_id) {
      throw new Error("Token ou ID não recebido na resposta do servidor.");
    }

    return response.data;
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Erro ao fazer login!',
      text2: 'Verifique as credenciais utilizadas.',
      position: 'top',
    });
  }
};
