import { Box } from "@/components/ui/box"
import {Text} from 'react-native'
import { ScrollView } from "react-native-gesture-handler"
import { StatusOptions, StatusType } from "../types/status"

interface PropsType{
    selectedValue: string | undefined
    setSelectedValue: React.Dispatch<React.SetStateAction<string | undefined>>
    hiddenOptions?: StatusType[]
}

export default function StatusFilterPicker(props: PropsType){
    const {selectedValue, setSelectedValue, hiddenOptions} = props

    return (
        <ScrollView horizontal alwaysBounceHorizontal showsHorizontalScrollIndicator={false}>
            <Box className="flex flex-row gap-3 p-4">
                <Text className="px-3 py-1 rounded-full font-medium" onPress={() => setSelectedValue(undefined)} 
                style={{
                        backgroundColor: selectedValue === undefined ? '#d6c2f1' : '#d1d5db',
                        color: selectedValue === undefined ? '#6200ee': ''
                    }}
                >
                    Todos
                </Text>
                {StatusOptions.filter(i => !hiddenOptions?.includes(i)).map(opt => 
                    <Text 
                    className="px-3 py-1 rounded-full font-medium"
                    style={{
                        backgroundColor: selectedValue === opt ? '#d6c2f1' : '#d1d5db',
                        color: selectedValue === opt ? '#6200ee': ''
                    }}
                    key={opt}
                    onPress={() => setSelectedValue(opt)}
                    >
                        {opt}
                    </Text>
                )}
            </Box>
        </ScrollView>
    )

}