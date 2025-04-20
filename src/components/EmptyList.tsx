import { Box } from "@/components/ui/box";
import { AlertCircleIcon, Icon } from "@/components/ui/icon";
import { Text } from "react-native";

interface PropsType{
    text: string
}

export default function EmptyList(props: PropsType){
    const {text} = props

    return (
        <Box className="items-center gap-5">
            <Text className="text-xl">{text}</Text>
            <Icon as={AlertCircleIcon}/>
        </Box>
    )
}