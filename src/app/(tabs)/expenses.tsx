import { Box } from "@/components/ui/box";
import { Expense, getExpensesByUser } from "@/src/api/expenseService/getExpense";
import CardExpense from "@/src/components/expense/cardExpense";
import View from "@expo/html-elements/build/primitives/View";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Heading } from "@/components/ui/heading";

export default function Expenses() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(true); // 👈 novo estado
    const router = useRouter();

    const getExpenses = async () => {
        try {
            setLoading(true); // 👈 inicia loading
            const response = await getExpensesByUser();
            setExpenses(response ?? []);
        } catch (error) {
            console.error("Erro ao buscar despesas:", error);
        } finally {
            setLoading(false); // 👈 finaliza loading
        }
    };

    useEffect(() => {
        getExpenses();
    }, []);

    return (
        <Box style={{ flex: 1 }}>
            <Heading size="2xl" className="px-3 py-3">Lista de reembolsos</Heading>

            {loading ? (
                <Box className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#6200EE" />
                </Box>
            ) : expenses.length === 0 ? (
                <Text className="text-center mt-6">Cadastre um novo reembolso</Text>
            ) : (
                <FlatList
                    data={expenses}
                    keyExtractor={(item, index) => index.toString()}   
                    numColumns={2} 
                    renderItem={({ item }) => (
                        <View style={{ width: '50%', padding: 5 }}>
                            <CardExpense 
                                id={item._id}
                                value={item.value}
                                type={item.type}
                                date={item.date}
                                description={item.description}
                                image={item.image}
                                onDelete={getExpenses}
                            />
                        </View>
                    )}
                />
            )}

            <TouchableOpacity
                style={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20,
                    backgroundColor: '#6200EE',
                    padding: 10,
                    paddingHorizontal: 17,
                    borderRadius: 30,
                }}
                onPress={() => router.push('/refund')} 
            >
                <Text style={{ color: '#fff', fontSize: 18 }}>+</Text> 
            </TouchableOpacity>
        </Box>
    );
}
