import { Box } from "@/components/ui/box"
import { Heading } from "@/components/ui/heading"
import { getRequestsByUser } from "@/src/api/requestService/request"
import { useCallback, useEffect, useState } from "react"
import { FlatList, ListRenderItemInfo, Pressable, Text, TouchableOpacity } from 'react-native'
import Request from "@/src/types/request"
import { useLocalSearchParams, useRouter } from 'expo-router'
import { RefreshControl } from "react-native-gesture-handler"
import StatusBadge from "@/src/components/request/StatusBadge"
import AddButton from "@/src/components/AddButton"
import { SearchIcon } from "@/components/ui/icon"
import { Input, InputSlot, InputIcon, InputField } from "@/components/ui/input"

export default function ListRequests(){
    const [requests, setRequests] = useState<Request[]>([])
    const [refreshing, setRefreshing] = useState(false)
    const [searchText, setSearchText] = useState("")
    const router = useRouter()

    const fetchRequests = async () => {
        const newRequests = await getRequestsByUser(searchText)
        setRequests(newRequests)
    }

    const refreshRequests = useCallback(() => {
        setRefreshing(true)
        fetchRequests()
        setRefreshing(false)
    }, [searchText])

    useEffect(()=>{
        fetchRequests()
    }, [searchText])

    return (
    <Box className="flex-1">
        <Heading size="2xl" className="px-3 py-3 my-3">Solicitações</Heading>
        <Input className="w-5/6 mx-auto border border-[#8a2be2]">
            <InputSlot className="p-2">
                <InputIcon as={SearchIcon} />
            </InputSlot>
            <InputField placeholder="Procurar por nome ou código..." value={searchText} onChangeText={v => setSearchText(v)} />
        </Input>
        <AddButton href='/requests/new'/>
        <FlatList 
        data={requests}
        keyExtractor={item => item._id}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refreshRequests}/>
        }
        renderItem={({item}: ListRenderItemInfo<Request>) => 
        <Pressable
        className="flex-row justify-between items-center p-3"
        onPress={() => router.push({pathname: '/requests/[request_id]', params: { request_id: item._id} })}>
            <Box className="gap-1">
                <Text className="text-lg">{item.title}</Text>
                <Text className="text-gray-300 text-sm">#{item.code}</Text>
            </Box>
            <StatusBadge status={item.status}/>
        </Pressable>
    }>
        </FlatList>
    </Box>
    )
}