import { Text } from "@/components/ui/text";
import { Href, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function AddButton({href}: {href: Href}){
    const router = useRouter()
    return (
        <TouchableOpacity
            style={{
                position: 'absolute',
                bottom: 20,
                right: 20,
                backgroundColor: '#6200EE',
                padding: 10,
                paddingHorizontal: 16,
                borderRadius: 30,
                zIndex: 9999,
                boxShadow: '#0000003d 0px 3px 8px',
                flex: 1
            }}
            onPress={() => router.push(href)}
        >
            <Text style={{ color: '#fff', fontSize: 18 }}>+</Text> 
        </TouchableOpacity>
    )
}