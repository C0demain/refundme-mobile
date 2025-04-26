import { Box } from "@/components/ui/box";
import { getProjects, getProjectsByUser } from "@/src/api/projectService/getProjects";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";

interface PropsType{
    selectedValue: string
    setSelectedValue: React.Dispatch<React.SetStateAction<string>>
    userOnly?: boolean
}

export default function ProjectPicker(props: PropsType){
    const {selectedValue, setSelectedValue, userOnly} = props
    const [options, setOptions] = useState<any[]>()

    const fetchProjects = async () => {
        let newProjects = []
        if(!!userOnly){
            newProjects = await getProjectsByUser()
        }else{
            newProjects = await getProjects()
        }
        setOptions(newProjects)
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    useFocusEffect(useCallback(() => {
        fetchProjects()
    }, []))

    return (
        <Box className="mb-4 border border-[#8a2be2] rounded-lg bg-gray-100 w-full">
            <Picker selectedValue={selectedValue} onValueChange={(v) => setSelectedValue(v)}>
                <Picker.Item label="Selecione um projeto" value="" key={"default"}/>
                {options?.map(opt =>
                <Picker.Item label={opt.title} value={opt._id} key={opt._id}/>
                )}
            </Picker>
        </Box>
    )
}