import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { getRequestById } from "@/src/api/requestService/request";
import { useLocalSearchParams, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import RequestType from "@/src/types/request";
import { RefreshControl, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Spinner } from "@/components/ui/spinner";
import StatusBadge from "@/src/components/request/StatusBadge";
import EmptyList from "@/src/components/EmptyList";
import ExpenseItem from "@/src/components/expense/ExpenseItem";
import { Button } from "@/components/ui/button";
import { Link } from "expo-router";
import { useAuth } from "@/src/contexts/AuthContext";

export default function RequestPage() {
  const params = useLocalSearchParams();
  const request_id = String(params.request_id);
  const [request, setRequest] = useState<RequestType | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRequest = useCallback(async () => {
    setLoading(true);
    const newRequest = await getRequestById(request_id);
    setRequest(newRequest);
    setLoading(false);
  }, [request_id]);

  const refreshRequest = useCallback(() => {
    setRefreshing(true);
    fetchRequest().finally(() => setRefreshing(false));
  }, [fetchRequest]);

  useFocusEffect(
    useCallback(() => {
      fetchRequest();
    }, [fetchRequest])
  );

  if (loading) {
    return <Spinner size="large" className="h-full w-full" color="#8a2be2" />;
  }

  const formatCurrency = (value: number): string =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(value);

  return (
    <Box className="flex-1 bg-white">
      <FlatList
        data={request?.expenses}
        contentContainerClassName="gap-6 px-4 pb-6"
        ListHeaderComponent={
          <Box className="gap-4">

            {/* Título e status */}
            <Box className="flex-row items-start justify-between mt-4">
              <Box className="flex-1 pr-2">
                <Heading size="3xl" className="text-black font-extrabold">
                  {request?.title}
                </Heading>
                <Text className="text-base text-gray-500 mt-1">
                  {request?.project?.title}
                </Text>
                <Text className="text-sm text-gray-400 font-mono tracking-wide">
                  #{request?.project?.code?.toUpperCase()}
                </Text>
              </Box>
              <StatusBadge status={request?.status} />
            </Box>

            {/* Limite do Projeto */}
            <Box className="bg-gray-50 rounded-md px-4 py-3 mt-3 shadow-sm border border-gray-200">
              <Text className="text-base text-gray-800 font-semibold">
                Limite do Projeto
              </Text>
              <Text className="text-lg text-purple-800 font-bold">
                {formatCurrency(request?.project?.limit || 0)}
              </Text>
            </Box>

            {/* Soma das despesas */}
            <Box className="bg-gray-50 rounded-md px-4 py-3 shadow-sm border border-gray-200">
              <Text className="text-base text-gray-800 font-semibold">
                Soma das despesas
              </Text>
              <Text className="text-lg text-purple-800 font-bold">
                {formatCurrency(request?.totalExpensesValue || 0)}
              </Text>
            </Box>

            {/* Badge se estiver acima do limite */}
            {request?.isOverLimit && (
              <Badge
                size="lg"
                variant="solid"
                action="warning"
                className="flex flex-row gap-2 justify-start items-center px-4 py-3 mt-2 w-full bg-red-100 border border-red-300 rounded-md"
              >
                <BadgeIcon as={AlertCircleIcon} />
                <BadgeText className="text-red-700 font-semibold">
                  Esta solicitação está acima do limite
                </BadgeText>
              </Badge>
            )}

            {/* Subtítulo */}
            <Text className="text-xl font-bold mt-6 text-black border-b border-gray-200 pb-1">
              Despesas
            </Text>
          </Box>
        }
        ListEmptyComponent={<EmptyList text="Ainda não há despesas" />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshRequest} />
        }
        renderItem={({ item }) => <ExpenseItem expense={item} />}
      />

      {/* Botões de ação */}
      <Box className="px-4 pt-4 pb-2 space-y-3 bg-white border-t border-gray-200">
        <Link
          href={{ pathname: "/refund/[request_id]", params: { request_id } }}
          asChild
        >
          <Button className="w-full bg-purple-600 rounded-lg shadow-md mb-2" size="lg">
            <Text className="text-white text-base font-semibold">Cadastrar Despesa</Text>
          </Button>
        </Link>

        <Link
          href={{ pathname: "/requests/[request_id]/edit", params: { request_id } }}
          asChild
        >
          <Button className="w-full bg-purple-800 rounded-lg shadow-md mb-2" size="lg">
            <Text className="text-white text-base font-semibold">Editar Solicitação</Text>
          </Button>
        </Link>

        <Link
          href={{ pathname: "/requests/[request_id]/delete", params: { request_id } }}
          asChild
        >
          <Button className="w-full bg-red-500 rounded-lg shadow-md" size="lg">
            <Text className="text-white text-base font-semibold">Excluir Solicitação</Text>
          </Button>
        </Link>
      </Box>
    </Box>
  );
}