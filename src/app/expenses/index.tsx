import { Box } from "@/components/ui/box";
import { Expense, getExpensesByUser } from "@/src/api/expenseService/getExpense";
import CardExpense from "@/src/components/expense/cardExpense";
import View from "@expo/html-elements/build/primitives/View";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';  // Importa o useNavigation
import { useRouter } from "expo-router";

export default function Expenses() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const router = useRouter()

    const getExpenses = async () => {
        try {
            const response = await getExpensesByUser();
            console.log(response);
            setExpenses(response ?? []);
        } catch (error) {
            console.error("Erro ao buscar despesas:", error);
        }
    };

    useEffect(() => {
        getExpenses();
    }, []);

    return (
        <Box style={{ flex: 1 }}>
            {expenses.length === 0 ? (
                <Text>Cadastre um novo reembolso</Text>
            ) : (
                <FlatList
                    data={expenses}
                    keyExtractor={(item, index) => index.toString()}     // Evita erro de key
                    numColumns={2} // Define duas colunas
                    renderItem={({ item }) => (
                        <View style={{ flex: 1, padding: 5 }}>
                            <CardExpense 
                                value={item.value}
                                type={item.type}
                                date={item.date}
                                description={item.description}
                                image={item.image}
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
                    padding: 15,
                    borderRadius: 30,
                    shadowColor: '#000', 
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 5,
                }}
                onPress={() => router.push('/refund')} 
            >
                <Text style={{ color: '#fff', fontSize: 18 }}>+</Text> 
            </TouchableOpacity>
        </Box>
    );
}
