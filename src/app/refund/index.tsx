import { useEffect, useState } from "react";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import CurrencyInput from "react-native-currency-input";
import * as DocumentPicker from "expo-document-picker";
import { Picker } from "@react-native-picker/picker";
import { ActivityIndicator } from "react-native";
import { createExpense } from "../../api/refundService/refund";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Refund() {
  const [type, setType] = useState("");
  const [value, setValue] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);  
  const [file, setFile] = useState<{ uri: string; name: string; type: string } | null>(null);

  const fetchUserId = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem("userId");
      setUserId(storedUserId);  
    } catch (error) {
      console.error("Erro ao buscar o userId:", error);
    }
  };

  useEffect(() => {
    fetchUserId();
  }, []); 

  const handleDateChange = (text: string) => {
    let formattedDate = text.replace(/\D/g, "");
  
    if (formattedDate.length > 2) {
      formattedDate = formattedDate.slice(0, 2) + "/" + formattedDate.slice(2);
    }
    if (formattedDate.length > 5) {
      formattedDate = formattedDate.slice(0, 5) + "/" + formattedDate.slice(5, 9);
    }
  
    if (formattedDate.length === 10) {
      const [day, month, year] = formattedDate.split("/").map(Number);
      const isValidDate =
        day > 0 && day <= 31 &&
        month > 0 && month <= 12 &&
        year >= 1900 && year <= new Date().getFullYear();
  
      if (!isValidDate) {
        setError("Data inválida. Use o formato DD/MM/AAAA.");
      } else {
        setError("");
  
        // Converte para formato ISO 8601: "YYYY-MM-DD"
        const isoDate = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
        setDate(isoDate);
      }
    } else {
      setDate(formattedDate);
    }
  };
  

  const handleRefund = async () => {
    if (!type || value === null || !date || !userId) {
      setError("Os campos Tipo, Valor, Data e UserId são obrigatórios.");
      return;
    }
    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1500);

    // Certificando-se de que o arquivo e nome da imagem sejam válidos
    const image = fileName
    ? { uri: file?.uri, name: fileName.split("/").pop(), type: file?.type || "application/octet-stream" }
    : undefined;

    const expenseData = {
      value,
      userId,
      type,
      date,
      description,
      image,
    };

    try {
      const response = await createExpense(expenseData); 
      console.log("Reembolso cadastrado:", response);
    } catch (error) {
      console.error("Erro ao cadastrar reembolso:", error);
      setError("Erro ao cadastrar reembolso. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
      });
  
      if (!result.canceled) {
        const file = result.assets[0];
        setFileName(file.name);
        setFile({
          uri: file.uri, // Garante que o caminho é completo
          name: file.name,
          type: file.mimeType || "application/octet-stream", // Defina um tipo padrão
        });
      }
    } catch (error) {
      console.error("Erro ao selecionar arquivo:", error);
    }
  };
  
  return (
    <Box className="flex-1 items-center justify-center p-4 bg-white">
      <Text className="text-3xl font-bold text-[#8a2be2] mb-6">Cadastro de Reembolso</Text>
      {error ? <Text className="text-red-500 mb-4">{error}</Text> : null}

      <Box className="w-80 mb-4 border border-[#8a2be2] rounded-lg bg-gray-100">
        <Picker
          selectedValue={type}
          onValueChange={(itemValue) => setType(itemValue)}
          className="w-full p-3 text-gray-800"
        >
          <Picker.Item label="Selecione um tipo" value="" />
          <Picker.Item label="Alimentação" value="Alimentação" />
          <Picker.Item label="Transporte" value="Transporte" />
          <Picker.Item label="Papelaria" value="Papelaria" />
          <Picker.Item label="Hospedagem" value="Hospedagem" />
        </Picker>
      </Box>

      <Input className="w-80 mb-4 border border-[#8a2be2] rounded-lg bg-gray-100">
        <CurrencyInput
          value={value}
          onChangeValue={setValue}
          prefix="R$ "
          delimiter="."
          separator="," 
          precision={2}
          minValue={0}
          maxLength={12}
          keyboardType="numeric"
          placeholder="Valor"
          className="w-full p-2 text-gray-800"
        />
      </Input>

      <Input className="w-80 mb-4 border border-[#8a2be2] rounded-lg bg-gray-100">
        <InputField
          placeholder="DD/MM/AAAA"
          keyboardType="numeric"
          value={date}
          onChangeText={handleDateChange}
          maxLength={10}
          className="w-full p-2 placeholder:text-gray-500"
        />
      </Input>

      <Input className="w-80 mb-4 border border-[#8a2be2] rounded-lg h-32 bg-gray-100">
        <InputField
          placeholder="Descrição (Opcional)"
          autoCapitalize="none"
          value={description}
          onChangeText={setDescription}
          multiline
          keyboardType="default"
          className="w-full p-3 placeholder:text-gray-500"
        />
      </Input>

      <Button className="items-center justify-center w-80 mb-2 bg-[#8a2be2] rounded-lg p-3 flex-row" onPress={pickDocument}>
        <ButtonText className="text-white text-sm font-bold">
          {fileName ? "Alterar Arquivo" : "Selecionar Arquivo"}
        </ButtonText> 
      </Button>
      {fileName && (
        <Text className="mb-4 text-gray-800 italic">📂 {fileName}</Text>
      )}
 
      <Button
        className="items-center justify-center w-80 bg-[#8a2be2] rounded-lg p-3 flex-row"
        onPress={handleRefund}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <ButtonText className="text-white text-sm font-bold">CADASTRAR</ButtonText>
        )}
      </Button>
    </Box>
  );
}
