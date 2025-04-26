import { Box } from "@/components/ui/box";
import { getAllProjects } from "@/src/api/projectService/project";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";

interface PropsType{
    selectedValue: string
    setSelectedValue: React.Dispatch<React.SetStateAction<string>>
}

export default function ProjectPicker(props: PropsType){
    const {selectedValue, setSelectedValue} = props
    const [options, setOptions] = useState<any[]>()

    const fetchProjects = async () => {
        const newProjects = await getAllProjects()
        setOptions(newProjects)
    }

    useEffect(() => {
        fetchProjects()
    }, [])

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