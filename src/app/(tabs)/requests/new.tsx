import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { createRequest } from "@/src/api/requestService/request";
import ProjectPicker from "@/src/components/form/ProjectPicker";
import { useRouter } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";

export default function NewRequest(){
    const [project, setProject] = useState("")
    const [title, setTitle] = useState("")
    const router = useRouter();

    const handleSubmit = async () => {
        try{
            await createRequest(title, project)
            Toast.show({
                type: 'success',
                text1: 'Requisição criada',
                position: 'top',
                autoHide: true,
                visibilityTime: 4000
            })
            setProject("")
            setTitle("")
            router.push('/requests')
            
        }catch(e){
            Toast.show({
                type: 'error',
                text1: "Erro na criação de requisição",
                text2: 'Não foi possível criar uma nova requisição',
                position: 'top',
                autoHide: true,
                visibilityTime: 4000
            })
        }
    }

    return (
        <Box className="flex-1 items-center justify-center p-4 bg-white">
            <Heading size="2xl" className="px-3 py-3 my-3 text-[#8a2be2]">Nova solicitação</Heading>
            <Box className="w-full gap-4">
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
                        onChangeText={v => setTitle(v)}
                        />
                    </Input>
                </FormControl>
                <FormControl isRequired>
                    <FormControlLabel>
                        <FormControlLabelText>Projeto</FormControlLabelText>
                    </FormControlLabel>
                    <ProjectPicker selectedValue={project} setSelectedValue={setProject} userOnly/>
                </FormControl>
                <Button
                className="bg-[#8a2be2] rounded-lg"
                onPress={handleSubmit}
                >
                    <ButtonText className="text-white text-sm font-bold">Criar</ButtonText>
                </Button>
            </Box>
        </Box>
    )
}