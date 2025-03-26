import React, { useState, useRef } from "react";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Input } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import CurrencyInput from "react-native-currency-input";
<<<<<<< Updated upstream:src/app/refoundnew/index.tsx
import * as DocumentPicker from "expo-document-picker";
import { Picker } from "@react-native-picker/picker";
=======
import * as ImagePicker from "expo-image-picker";
import { ActivityIndicator, TextInput, Image, Alert, Picker } from "react-native";
import { createExpense } from "@/src/api/refundService/refund";
>>>>>>> Stashed changes:src/app/refund/index.tsx

export default function Refund() {
  const [type, setType] = useState("");
  const [value, setValue] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | undefined>(undefined);
  const [error, setError] = useState("");
  const [date, setDate] = useState("");
<<<<<<< Updated upstream:src/app/refoundnew/index.tsx
=======
  const userId = "67dd4358e5c1dba3c378a93f";
  const [loading, setLoading] = useState(false);
>>>>>>> Stashed changes:src/app/refund/index.tsx

  const valueRef = useRef<TextInput>(null);
  const dateRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);

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
      setError(isValidDate ? "" : "Invalid date. Use the format DD/MM/YYYY.");
    }

    setDate(formattedDate);
  };

  const handleRefund = async () => {
    if (!type || value === null || !date) {
      setError("Tipo, Valor, and Data are required.");
      return;
    }

    const [day, month, year] = date.split("/").map(Number);
    const isoDate = new Date(year, month - 1, day).toISOString();

    setError("");
<<<<<<< Updated upstream:src/app/refoundnew/index.tsx

    console.log("Tipo:", type);
    console.log("Valor:", value);
    console.log("Data:", date);
    console.log("Descrição:", description);
    console.log("Arquivo Selecionado:", fileName);
=======
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log("Tipo:", type);
      console.log("Valor:", value);
      console.log("Data:", date);
      console.log("Descrição:", description);
      console.log("Arquivo Selecionado:", image);
    }, 1500);

    try {
      await createExpense({
        value,
        userId,
        type,
        date: isoDate,
        description,
      });
      console.log("Reembolso criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar reembolso:", error);
    }
    setLoading(false);
>>>>>>> Stashed changes:src/app/refund/index.tsx
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].file);
    }
  };

  const removeImage = () => {
    setImage(undefined);
  };

  return (
<<<<<<< Updated upstream:src/app/refoundnew/index.tsx
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
=======
    <Box className="flex-1 items-center justify-center p-4 bg-white">
      <Text className="text-3xl font-bold text-[#8a2be2] mb-6">Cadastro de Reembolso</Text>
      {error && <Text className="text-red-500 mb-4">{error}</Text>}

      <Picker
        selectedValue={type}
        onValueChange={(itemValue) => setType(itemValue)}
        style={{ width: 320, height: 50, marginBottom: 16 }}
      >
        <Picker.Item label="Selecione um tipo" value="" />
        <Picker.Item label="Alimentação" value="Alimentação" />
        <Picker.Item label="Transporte" value="Transporte" />
        <Picker.Item label="Papelaria" value="Papelaria" />
        <Picker.Item label="Hospedagem" value="Hospedagem" />
      </Picker>

      <Input className="w-80 mb-4 border border-[#8a2be2] rounded-lg bg-gray-100">
>>>>>>> Stashed changes:src/app/refund/index.tsx
        <CurrencyInput
          ref={valueRef}
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

<<<<<<< Updated upstream:src/app/refoundnew/index.tsx
      <Input className="w-80 mb-4 border border-[#8a2be2] rounded-lg">
        <InputField
=======
      <Input className="w-80 mb-4 border border-[#8a2be2] rounded-lg bg-gray-100">
        <TextInput
          ref={dateRef}
>>>>>>> Stashed changes:src/app/refund/index.tsx
          placeholder="DD/MM/AAAA"
          keyboardType="numeric"
          value={date}
          onChangeText={handleDateChange}
          maxLength={10}
          className="w-full p-3 text-gray-800"
        />
      </Input>

<<<<<<< Updated upstream:src/app/refoundnew/index.tsx
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
=======
      <Button className="items-center justify-center w-80 mb-2 bg-[#8a2be2] rounded-lg p-3 flex-row" onPress={pickImage}>
        <ButtonText className="text-white text-sm font-bold">
          {image ? "Alterar Imagem" : "Selecionar Imagem"}
        </ButtonText>
      </Button>

      {image && (
        <Box className="items-center mb-4">
          <Text className="mt-2 text-gray-800 italic">📷 Imagem selecionada</Text>
          <Button className="mt-2 w-80 mb-2 bg-red-500 rounded-lg p-3 flex-row" onPress={removeImage}>
            <ButtonText className="text-white text-sm font-bold">Remover Imagem</ButtonText>
          </Button>
        </Box>
      )}

      <Button className="items-center justify-center w-80 bg-[#8a2be2] rounded-lg p-3 flex-row" onPress={handleRefund} disabled={loading}>
        {loading ? <ActivityIndicator size="small" color="#fff" /> : <ButtonText className="text-white text-sm font-bold">CADASTRAR</ButtonText>}
>>>>>>> Stashed changes:src/app/refund/index.tsx
      </Button>
    </Box>
  );
}