import { useEffect, useState } from "react";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import CurrencyInput from "react-native-currency-input";
import * as DocumentPicker from "expo-document-picker";
import { Picker } from "@react-native-picker/picker";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message';
import { useLocalSearchParams, useRouter } from "expo-router";
import { createExpense } from "@/src/api/refundService/refund";

export default function Refund() {
  const params = useLocalSearchParams();
  const request_id = String(params.request_id);

  const [type, setType] = useState("");
  const [value, setValue] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [file, setFile] = useState<{ uri: string; name: string; type: string } | null>(null);

  const [kilometerPerLiter, setKilometerPerLiter] = useState<number | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  const router = useRouter();

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

  useEffect(() => {
    if (type === "Combustível" && kilometerPerLiter && distance) {
      const calculatedValue = (distance / kilometerPerLiter) * 6.28;
      setValue(Number(calculatedValue.toFixed(2)));
    }
  }, [type, kilometerPerLiter, distance]);

  const handleDateChange = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    let formatted = cleaned;
    if (cleaned.length > 2) formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    if (cleaned.length > 4) formatted = formatted.slice(0, 5) + '/' + cleaned.slice(4, 8);
    setDate(formatted);

    if (formatted.length === 10) {
      const [day, month, year] = formatted.split('/').map(Number);
      if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > new Date().getFullYear()) {
        Toast.show({
          type: 'error',
          text1: 'Data inválida!',
          text2: 'Confira se a data informada está correta.',
          position: 'top',
        });
        setDate("");
      }
    }
  };

  const handleRefund = async () => {
    if (!type || !date || !userId) {
      Toast.show({
        type: 'error',
        text1: 'Campos obrigatórios!',
        text2: 'Preencha Tipo, Data e Usuário.',
        position: 'top',
      });
      return;
    }

    if (type !== "Combustível" && (value === null || value === 0)) {
      Toast.show({
        type: 'error',
        text1: 'Campos obrigatórios!',
        text2: 'Preencha o Valor.',
        position: 'top',
      });
      return;
    }

    if (type === "Combustível" && (kilometerPerLiter === null || distance === null)) {
      Toast.show({
        type: 'error',
        text1: 'Campos obrigatórios!',
        text2: 'Preencha km/litro e distância em km.',
        position: 'top',
      });
      return;
    }

    setLoading(true);

    const image = fileName
      ? { uri: file?.uri, name: fileName.split("/").pop(), type: file?.type || "application/octet-stream" }
      : undefined;

    const expenseData: any = {
      value,
      userId,
      type,
      date,
      description,
      image,
      requestId: request_id
    };

    if (type === "Combustível") {
      expenseData.kilometerPerLiter = kilometerPerLiter;
      expenseData.distance = distance;
    }

    try {
      await createExpense(expenseData);
      Toast.show({
        type: 'success',
        text1: 'Sucesso!',
        text2: 'Reembolso cadastrado com sucesso.',
        position: 'top',
      });

      setDate("");
      setDescription("");
      setFile(null);
      setFileName("");
      setType("");
      setValue(null);
      setKilometerPerLiter(null);
      setDistance(null);

      router.push({ pathname: "/requests/[request_id]", params: { request_id } });
    } catch (error) {
      console.error("Erro ao cadastrar reembolso:", error);
      Toast.show({
        type: 'error',
        text1: 'Erro ao cadastrar',
        text2: 'Tente novamente mais tarde.',
        position: 'top',
      });
    } finally {
      setLoading(false);
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
      if (!result.canceled) {
        const file = result.assets[0];
        setFileName(file.name);
        setFile({
          uri: file.uri,
          name: file.name,
          type: file.mimeType || "application/octet-stream",
        });
      }
    } catch (error) {
      console.error("Erro ao selecionar arquivo:", error);
    }
  };

  return (
    <Box className="flex-1 items-center justify-center p-4 bg-white">
      <Text className="text-3xl font-bold text-[#8a2be2] mb-6">Cadastro de Reembolso</Text>

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
          <Picker.Item label="Combustível" value="Combustível" />
        </Picker>
      </Box>

      {type === "Combustível" && (
        <>
          <Input className="w-80 mb-4 border border-[#8a2be2] rounded-lg bg-gray-100">
            <InputField
              placeholder="Km por litro (km/L)"
              keyboardType="numeric"
              value={kilometerPerLiter?.toString() || ""}
              onChangeText={(text) => setKilometerPerLiter(Number(text))}
              className="w-full p-2 placeholder:text-gray-500"
            />
          </Input>

          <Input className="w-80 mb-4 border border-[#8a2be2] rounded-lg bg-gray-100">
            <InputField
              placeholder="Distância percorrida (Km)"
              keyboardType="numeric"
              value={distance?.toString() || ""}
              onChangeText={(text) => setDistance(Number(text))}
              className="w-full p-2 placeholder:text-gray-500"
            />
          </Input>
        </>
      )}

      {type !== "Combustível" && (
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
      )}

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

      <Button className="w-80 mb-4 bg-[#8a2be2] rounded-lg p-3 items-center justify-center" onPress={handleRefund}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <ButtonText className="text-white text-sm font-bold">Cadastrar Reembolso</ButtonText>
        )}
      </Button>
    </Box>
  );
}
