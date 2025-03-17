import { useState } from "react";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { MaskedTextInput } from "react-native-mask-text";
import * as DocumentPicker from "expo-document-picker";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity, Platform } from "react-native";

export default function Refound() {
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleRefound = () => {
    if (!type || !value || !date) {
      setError("Os campos Tipo, Valor e Data são obrigatórios.");
      return;
    }
    setError("");

    console.log("Tipo:", type);
    console.log("Valor:", value);
    console.log("Data:", date.toLocaleDateString("pt-BR"));
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
        </Picker>
      </Box>

      <Input className="w-80 mb-4 border border-[#8a2be2] rounded-lg">
        <MaskedTextInput
          mask="R$ 999.999.999,99"
          placeholder="Valor"
          keyboardType="numeric"
          value={value}
          onChangeText={setValue}
          className="w-full p-3 text-gray-800 placeholder:text-gray-800"
        />
      </Input>

      <TouchableOpacity onPress={() => setShowDatePicker(true)} className="w-80 mb-4 border border-[#8a2be2] rounded-lg p-3">
        <Text className="text-gray-800">{date.toLocaleDateString("pt-BR") || "Selecionar Data"}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "calendar"}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}

<Input className="w-80 mb-4 border border-[#8a2be2] rounded-lg">
        <InputField
          placeholder="Descrição (Opcional)"
          autoCapitalize="none"
          value={description}
          onChangeText={setDescription}
          className="w-full p-3 text-gray-800"
        />
      </Input>

      <Button className="items-center justify-center w-80 mb-2 bg-[#8a2be2] rounded-lg p-3" onPress={pickDocument}>
        <ButtonText className="text-white text-sm font-bold">Selecionar Arquivo</ButtonText>
      </Button>
      {fileName && <Text className="mb-4 text-gray-800">Arquivo: {fileName}</Text>}

      <Button className="items-center justify-center w-80 mb-4 bg-[#8a2be2] rounded-lg p-3" onPress={handleRefound}>
        <ButtonText className="text-white text-sm font-bold">CADASTRAR</ButtonText>
      </Button>
    </Box>
  );
}
