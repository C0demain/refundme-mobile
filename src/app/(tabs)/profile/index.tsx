import { useEffect, useState, useCallback } from "react";
import { ScrollView, ActivityIndicator, FlatList, View, Text, RefreshControl } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserById } from "@/src/api/userService/user";
import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionIcon, AccordionContent } from "@/components/ui/accordion";
import LogoutButton from "@/src/components/user/LogoutButton";
import { Ionicons } from "@expo/vector-icons";
import { user } from "@/src/types/user";

export default function UserProfilePage() {
    const [userId, setUserId] = useState<string | null>(null);
    const [user, setUser] = useState<user | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchUser(); // atualiza os dados
        setRefreshing(false);
    };

    const fetchUserId = async () => {
        try {
            const storedId = await AsyncStorage.getItem("userId");
            setUserId(storedId);
            console.log("UserId:", storedId);
        } catch (error) {
            console.error("Erro ao obter userId:", error);
        }
    };

    const fetchUser = useCallback(async () => {
        if (!userId) return;

        try {
            setLoading(true);
            console.log("Buscando usuário com ID:", userId);
            const data = await getUserById(userId);
            setUser(data);
            console.log(data)
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
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        router.replace('/login'); // redireciona para a tela de login
    };

    const role = user.role === "admin" ? "Administrador" : user.role === "user" ? "Usuário" : "Desconhecido";

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

                <Text className="text-lg mt-2">
                    <Text className="font-bold">Nome: </Text>{user.name}
                </Text>
                <Text className="text-lg mt-2">
                    <Text className="font-bold">Email: </Text>{user.email}
                </Text>
                <Text className="text-lg mt-2">
                    <Text className="font-bold">Função: </Text>{role}
                </Text>
                <Text className="text-lg mt-2">
                    <Text className="font-bold">Solicitações feitas: </Text>{user.requests?.length ?? 0}
                </Text>
                <Text className="text-lg mt-2">
                    <Text className="font-bold">Projetos vinculados: </Text>{user.projects?.length ?? 0}
                </Text>
            </Box>

            <Divider className="bg-gray-500 my-2" orientation="horizontal" />

            <Box className="bg-white p-4">
                <Accordion type="single" collapsable defaultValue={[]}>
                    <AccordionItem value="requests">
                        <AccordionHeader>
                            <AccordionTrigger onPress={() => setIsExpanded(!isExpanded)}>
                                <View style={{ flexDirection: "row", alignItems: "center", width: '100%' }}>
                                    <Heading size="md">Ver solicitações criadas</Heading>
                                    <Ionicons
                                        name={isExpanded ? "chevron-up" : "chevron-down"}
                                        size={20}
                                        color="black"
                                        style={{ marginLeft: 8 }}
                                    />
                                    <AccordionIcon />
                                </View>
                            </AccordionTrigger>
                        </AccordionHeader>

                        <AccordionContent>
                            {user.requests?.length === 0 ? (
                                <Text className="text-gray-500 mt-2">Nenhuma solicitação criada.</Text>
                            ) : (
                                <FlatList
                                    data={user.requests}
                                    keyExtractor={(item) => item._id}
                                    scrollEnabled={false}
                                    renderItem={({ item }) => (
                                        <Box className="gap-1 flex-1 mt-2">
                                            <Box className="flex-row items-center mb-1">
                                                <Text className="font-bold text-md">Título:</Text>
                                                <Text className="text-gray-600 text-md ml-5">{item.title}</Text>
                                            </Box>
                                            <Box className="flex-row items-center mb-1">
                                                <Text className="font-bold text-md">Status:</Text>
                                                <Text className="text-gray-600 text-md ml-5">{item.status}</Text>
                                            </Box>
                                            <Divider className="bg-gray-300 my-2" />
                                        </Box>

                                    )}
                                />
                            )}
                        </AccordionContent>
                    </AccordionItem>

                </Accordion>
            </Box>

            <Divider className="bg-gray-500 my-2" orientation="horizontal" />

            <Box className="bg-white">
                <Accordion type="single" collapsable defaultValue={[]}>
                    <AccordionItem value="logout">
                        <AccordionHeader>
                            <LogoutButton onLogout={handleLogout} />
                        </AccordionHeader>
                    </AccordionItem>
                </Accordion>
            </Box>

        </ScrollView>
    );
}
