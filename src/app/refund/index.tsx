import React, { useState, useRef } from "react";
import { Text, ScrollView, Image } from "react-native";
import { Box } from "@/components/ui/box"; 
import { Input, InputField } from "@/components/ui/input"; 
import { Button, ButtonText } from "@/components/ui/button";
import CurrencyInput from "react-native-currency-input";
import * as ImagePicker from "expo-image-picker";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@gluestack-ui/themed";
import { ChevronDownIcon } from "@gluestack-ui/themed";

export default function Refund() {
  const [type, setType] = useState("");
  const [value, setValue] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);
  const [error, setError] = useState("");
  const [date, setDate] = useState("");

  const valueRef = useRef(null);
  const dateRef = useRef(null);
  const descriptionRef = useRef(null);

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
      setError("Tipo, Valor e Data são obrigatórios.");
      return;
    }

    console.log("Tipo:", type);
    console.log("Valor:", value);
    console.log("Data:", date);
    console.log("Descrição:", description);
    console.log("Arquivo Selecionado:", imageUri);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <Box className="flex-1 items-center justify-start p-4"> 
      <Text className="text-3xl font-bold text-[#8a2be2] mb-10">Cadastro de Reembolso</Text>
      {error ? <Text className="text-red-500 mb-4">{error}</Text> : null}

      <Input className="w-80 mb-4 border border-[#8a2be2] rounded-lg">
        <CurrencyInput
          ref={valueRef}
          value={value}
          prefix="R$ "
          delimiter="."
          separator="," 
          precision={2}
          minValue={0}
          maxLength={12}
          keyboardType="numeric"
          placeholder="Valor"
          className="w-full p-3 text-gray-800 placeholder:text-gray-800"
          onChangeValue={setValue}
        />
      </Input>

      <Input className="w-80 mb-4 border border-[#8a2be2] rounded-lg">
        <InputField
          placeholder="DD/MM/AAAA"

          value={date}
          maxLength={10}
          className="w-full p-3 text-gray-800"
          onChangeText={handleDateChange}
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

      <Button className="w-80 mb-2 bg-[#8a2be2] rounded-lg p-3" onPress={pickImage}>
        <ButtonText className="text-white text-sm font-bold">Selecionar Imagem</ButtonText>
      </Button>
      {imageUri && <Image source={{ uri: imageUri }} className="w-40 h-40 mb-4 rounded-lg" />} 

      <Button className="w-80 mb-4 bg-[#8a2be2] rounded-lg p-3" onPress={handleRefund}>
        <ButtonText className="text-white text-sm font-bold">CADASTRAR</ButtonText>
      </Button>
    </Box>
  );
}