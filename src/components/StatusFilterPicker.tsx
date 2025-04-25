import { Box } from "@/components/ui/box"
import { Text } from 'react-native'
import { View } from 'react-native'

interface PropsType {
    selectedValue: string | undefined
    setSelectedValue: React.Dispatch<React.SetStateAction<string | undefined>>
}

const statusList = [
    "Rascunho",
    "Pendente",
    "Aprovado",
    "Recusado"
]

export default function StatusFilterPicker(props: PropsType) {
    const { selectedValue, setSelectedValue } = props

    return (
        <Box className="flex flex-row flex-wrap gap-3 p-4">
            <Text
                className="px-4 py-1 rounded-full font-medium"
                onPress={() => setSelectedValue(undefined)}
                style={{
                    backgroundColor: selectedValue === undefined ? '#d6c2f1' : '#d1d5db',
                    color: selectedValue === undefined ? '#6200ee' : ''
                }}
            >
                Todos
            </Text>
            {statusList.map(opt =>
                <Text
                    className="px-4 py-1 rounded-full font-medium"
                    style={{
                        backgroundColor: selectedValue === opt ? '#d6c2f1' : '#d1d5db',
                        color: selectedValue === opt ? '#6200ee' : ''
                    }}
                    key={opt}
                    onPress={() => setSelectedValue(opt)}
                >
                    {opt}
                </Text>
            )}
        </Box>
    )
}
