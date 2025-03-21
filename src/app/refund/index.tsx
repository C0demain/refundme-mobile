import { useState } from "react";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import CurrencyInput from "react-native-currency-input";
import * as DocumentPicker from "expo-document-picker";
import { Picker } from "@react-native-picker/picker";

export default function Refund() {
  const [type, setType] = useState("");
  const [value, setValue] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [date, setDate] = useState("");

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
      }
    }
    setDate(formattedDate);
  };

  const handleRefund = () => {
    if (!type || value === null || !date) {
      setError("Os campos Tipo, Valor e Data são obrigatórios.");
      return;
    }
    setError("");

    console.log("Tipo:", type);
    console.log("Valor:", value);
    console.log("Data:", date);
    console.log("Descrição:", description);
    console.log("Arquivo Selecionado:", fileName);
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: false,
      });

      if (!result.canceled) {
        setFileName(result.assets[0].name);
      }
    } catch (error) {
      console.error("Erro ao selecionar arquivo:", error);
    }
  };

  return (
    <Box className="flex-1 items-center justify-center p-4">
      <Text className="text-3xl font-bold text-[#8a2be2] mb-10">Cadastro de Reembolso</Text>
      {error ? <Text className="text-red-500 mb-4">{error}</Text> : null}

      <Box className="w-80 mb-4 border border-[#8a2be2] rounded-lg">
        <Picker selectedValue={type} onValueChange={(itemValue) => setType(itemValue)} className="w-full p-3 text-gray-800">
          <Picker.Item label="Selecione um tipo" value="" />
          <Picker.Item label="Alimentação" value="Alimentação" />
          <Picker.Item label="Transporte" value="Transporte" />
          <Picker.Item label="Papelaria" value="Papelaria" />
          <Picker.Item label="Hospedaria" value="Hospedaria" />
        </Picker>
      </Box>

      <Input className="w-80 mb-4 border border-[#8a2be2] rounded-lg">
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
          className="w-full p-3 text-gray-800 placeholder:text-gray-800"
        />
      </Input>

      <Input className="w-80 mb-4 border border-[#8a2be2] rounded-lg">
        <InputField
          placeholder="DD/MM/AAAA"
          keyboardType="numeric"
          value={date}
          onChangeText={handleDateChange}
          maxLength={10}
          className="w-full p-3 text-gray-800"
        />
      </Input>

      <Input className="w-80 mb-4 border border-[#8a2be2] rounded-lg h-32">
        <InputField
          placeholder="Descrição (Opcional)"
          autoCapitalize="none"
          value={description}
          onChangeText={setDescription}
          multiline
          className="w-full p-3 text-gray-800"
        />
      </Input>

      <Button className="items-center justify-center w-80 mb-2 bg-[#8a2be2] rounded-lg p-3" onPress={pickDocument}>
        <ButtonText className="text-white text-sm font-bold">Selecionar Arquivo</ButtonText>
      </Button>
      {fileName && <Text className="mb-4 text-gray-800">Arquivo: {fileName}</Text>}

      <Button className="items-center justify-center w-80 mb-4 bg-[#8a2be2] rounded-lg p-3" onPress={handleRefund}>
        <ButtonText className="text-white text-sm font-bold">CADASTRAR</ButtonText>
      </Button>
    </Box>
  );
}
