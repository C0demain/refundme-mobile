import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { getRequestById } from "@/src/api/requestService/request";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import Request from "@/src/types/request"
import { RefreshControl, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Spinner } from "@/components/ui/spinner";
import StatusBadge from "@/src/components/request/StatusBadge";
import EmptyList from "@/src/components/EmptyList";
import ExpenseItem from "@/src/components/expense/ExpenseItem";
import AddButton from "@/src/components/AddButton";

export default function RequestPage(){
    const params = useLocalSearchParams();
    const request_id = String(params.request_id)
    const [request, setRequest] = useState<Request | null>(null)
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    const fetchRequest = async () => {
        setLoading(true)
        const newRequest = await getRequestById(request_id)
        setRequest(newRequest)
        setLoading(false)
    }

    const refreshRequest = useCallback(() => {
        setRefreshing(true)
        fetchRequest()
        setRefreshing(false)
    }, [request_id])

    useEffect(() => {
        fetchRequest()
    }, [request_id])

    if(loading){
        return <Spinner size="large" className="h-full w-full" color="#8a2be2"/>
    }

    return (
        <Box className="flex-1">
            <FlatList
            data={request?.expenses}
            contentContainerClassName="gap-6 mx-2"
            ListHeaderComponent={
            <Box className="mx-">
                <Box className="flex-row items-center justify-between">
                    <Heading size="3xl" className="px-3 py-3">{request?.title}</Heading>
                    <StatusBadge status={request?.status}/>
                </Box>
                <Box className="flex flex-row justify-between mb-4">
                    <Text className="mb-2 text-lg">{request?.project.title}</Text>
                    <Text className="mb-2 text-lg text-gray-500">#{request?.project.code}</Text>
                </Box>
                {request?.isOverLimit && <Badge size="lg" variant="solid" action="warning" className="flex flex-row gap-2 justify-between p-3 w-2/3 mx-auto">
                    <BadgeIcon as={AlertCircleIcon} />
                    <BadgeText>Esta solicitação está acima do limite</BadgeText>
                </Badge>}
                <Text className="text-2xl">Despesas</Text>
            </Box>
            }
            ListEmptyComponent={<EmptyList text="Ainda não há despesas"/>}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshRequest}/>}
            renderItem={({ item }) => 
                <ExpenseItem expense={item}/>
        }  
            >
            </FlatList>
            <AddButton href={{pathname: '/refund/[request_id]', params: { request_id } }}/>
        </Box>
    )
}