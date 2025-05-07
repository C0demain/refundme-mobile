import { useEffect, useState, useCallback } from "react";
import { ScrollView, ActivityIndicator, FlatList, View, Text, TouchableOpacity, RefreshControl } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserById } from "@/src/api/userService/user";
import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionIcon, AccordionContent } from "@/components/ui/accordion";
import { Ionicons } from "@expo/vector-icons";

type User = {
    _id: string;
    name: string;
    email: string;
    role: string;
    requests: any[];
    projects: string[];
};

export default function UserProfilePage() {
    const [userId, setUserId] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchUser(); // atualiza os dados
        setRefreshing(false);
    };

    const fetchUserId = async () => {
        try {
            const storedId = await AsyncStorage.getItem("userId");
            setUserId(storedId);
        } catch (error) {
            console.error("Erro ao obter userId:", error);
        }
    };

    const fetchUser = useCallback(async () => {
        if (!userId) return;

        try {
            setLoading(true);
            const data = await getUserById(userId);
            setUser(data);
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useFocusEffect(
        useCallback(() => {
            fetchUserId();
        }, [])
    );

    useEffect(() => {
        if (userId) fetchUser();
    }, [userId]);

    if (loading || !user) {
        return <ActivityIndicator size="large" />;
    }

    return (
        <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 32 }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }>
            <Box className="p-4 bg-white">
                <Heading size="xl" className="mb-4">
                    Perfil do Usuário
                </Heading>
                <Text className="text-lg">Nome: {user.name}</Text>
                <Text className="text-lg">Email: {user.email}</Text>
                <Text className="text-lg">Função: {user.role.toUpperCase()}</Text>
                <Text className="text-lg">Solicitações feitas: {user.requests.length}</Text>
                <Text className="text-lg">Projetos vinculados: {user.projects.length}</Text>
            </Box>

            <Divider className="bg-gray-700 my-2" orientation="horizontal" />

            <Box className="bg-white p-4">
                <Accordion type="single" collapsable defaultValue={[]}>
                    <AccordionItem value="projects">
                        <AccordionHeader>
                            <AccordionTrigger>
                                <View style={{ flexDirection: "row" }}>
                                    <Heading size="md">Ver projetos vinculados</Heading>
                                    <AccordionIcon />
                                </View>
                            </AccordionTrigger>
                        </AccordionHeader>

                        <AccordionContent>
                            <FlatList
                                data={user.projects}
                                keyExtractor={(item) => item}
                                scrollEnabled={false}
                                renderItem={({ item }) => (
                                    <>
                                        <Box className="gap-1 flex-1">
                                            <Text className="text-md">Projeto ID:</Text>
                                            <Text className="text-gray-600 text-sm">{item}</Text>
                                        </Box>
                                    </>
                                )}
                            />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </Box>
        </ScrollView>
    );
}
