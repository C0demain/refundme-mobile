import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { getRequestById, updateRequestById } from "@/src/api/requestService/request";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { Picker } from "@react-native-picker/picker";
import { ActivityIndicator } from "react-native";

export default function RequestEdit() {
    const router = useRouter();
    const { request_id } = useLocalSearchParams();
    const [title, setTitle] = useState("");
    const [project, setProject] = useState("");
    const [status, setStatus] = useState("Pendente");
    const [loading, setLoading] = useState(true); // Start as true

    const statusOptions = ["Pendente", "Aprovado", "Recusado"];

    useEffect(() => {
        setTitle("");       // Limpa título
        setProject("");     // Limpa projeto
        setStatus("Pendente"); // Volta status ao padrão
        setLoading(true);   // Garante que a tela mostra loader
        
        const fetchData = async () => {
            try {
                if (typeof request_id === 'string') {
                    const data = await getRequestById(request_id);
                    console.log("request_id:", request_id);
                    console.log("data:", data);

                    if (data) {
                        setTitle(data.title);
                        setProject(data._id);
                        setStatus(data.status || "Pendente");
                    }
                }
            } catch (error) {
                console.error("Erro ao buscar solicitação:", error);
                Toast.show({
                    type: 'error',
                    text1: 'Erro ao carregar solicitação',
                    position: 'top'
                });
            } finally {
                setLoading(false); // Stop loader
            }
        };

        fetchData();
    }, [request_id]);

    const handleUpdate = async () => {
        try {
            if (typeof request_id === "string") {
                console.log("Atualizando solicitação:", { title, projectId: project, status });
                await updateRequestById(request_id, { title, projectId: project, status });
                Toast.show({
                    type: 'success',
                    text1: 'Sucesso',
                    text2: 'Solicitação atualizada com sucesso',
                    position: 'top',
                });
                router.push("/requests");
            }
        } catch (error) {
            console.error("Erro ao atualizar:", error);
            Toast.show({
                type: 'error',
                text1: 'Erro na atualização',
                text2: 'Não foi possível atualizar a solicitação',
                position: 'top',
            });
        }
    };

    return (
        <Box className="flex-1 items-center justify-center p-4 bg-white">
            {loading ? (
                <ActivityIndicator size="large" color="#8a2be2" />
            ) : (
                <>
                    <Heading size="2xl" className="px-3 py-3 my-3 text-[#8a2be2]">
                        Editar solicitação
                    </Heading>

                    <Box className="w-full space-y-6">
                        <FormControl isRequired>
                            <FormControlLabel>
                                <FormControlLabelText>Título</FormControlLabelText>
                            </FormControlLabel>
                            <Input>
                                <InputField
                                    size="6xl"
                                    placeholder="Título"
                                    multiline={false}
                                    value={title}
                                    onChangeText={(v) => setTitle(v)}
                                />
                            </Input>
                        </FormControl>

                        <FormControl isRequired>
                            <FormControlLabel>
                                <FormControlLabelText>Status</FormControlLabelText>
                            </FormControlLabel>
                            <Box className="border border-gray-300 rounded-lg px-0">
                                <Picker
                                    selectedValue={status}
                                    onValueChange={(itemValue) => setStatus(itemValue)}
                                    style={{ height: 50, width: "100%" }}
                                >
                                    {statusOptions.map((opt) => (
                                        <Picker.Item key={opt} label={opt} value={opt} />
                                    ))}
                                </Picker>
                            </Box>
                        </FormControl>

                        <Button
                            className="bg-[#8a2be2] rounded-lg mt-8"
                            onPress={handleUpdate}
                        >
                            <ButtonText className="text-white text-sm font-bold">
                                Atualizar
                            </ButtonText>
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );

}
