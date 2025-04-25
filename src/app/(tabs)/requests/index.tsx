import { Box } from "@/components/ui/box"
import { Heading } from "@/components/ui/heading"
import { getRequests, getRequestsByUser } from "@/src/api/requestService/request"
import { useCallback, useEffect, useState } from "react"
import { FlatList, ListRenderItemInfo, Pressable, Text, TouchableOpacity } from 'react-native'
import RequestType from "@/src/types/request"
import { useLocalSearchParams, useRouter } from 'expo-router'
import AddButton from "@/src/components/AddButton"
import { SearchIcon } from "@/components/ui/icon"
import { Input, InputSlot, InputIcon, InputField } from "@/components/ui/input"
import { useFocusEffect } from "expo-router";
import StatusFilterPicker from "@/src/components/StatusFilterPicker"
import React from "react"
import { RequestList } from "@/src/components/request/RequestList"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function ListRequests(){
    const [userRole, setUserRole] = useState<string>('')
    const [requests, setRequests] = useState<RequestType[]>([])
    const [refreshing, setRefreshing] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [status, setStatus] = useState<string | undefined>()
    const { userOnly, project } = useLocalSearchParams<{userOnly?: string, project?: string}>()
    const router = useRouter()

    const fetchRequests = async () => {
        const fetchFunction = userRole === 'admin' ? getRequests : getRequestsByUser
        const newRequests = await fetchFunction(searchText, status)
        setRequests(newRequests)
    }

    const fetchStoredRole = async () => {
        const newRole = await AsyncStorage.getItem('role')
        setUserRole(String(newRole))
    }

    const refreshRequests = useCallback(() => {
        setRefreshing(true)
        fetchStoredRole()
        fetchRequests()
        setRefreshing(false)
    }, [searchText, status])

     useFocusEffect(
        useCallback(() => {
            fetchStoredRole()
            fetchRequests()
        }, [searchText, status])
    )

    useEffect(() => {
        fetchStoredRole()
        fetchRequests()
    }, [searchText, status])

    return (
    <Box className="flex-auto w-screen">
        <Heading size="2xl" className="px-3 py-3 my-3">Solicitações</Heading>
        <Input className="w-5/6 mx-auto border border-[#8a2be2]">
            <InputSlot className="p-2">
                <InputIcon as={SearchIcon} />
            </InputSlot>
            <InputField placeholder="Procurar por nome ou código..." value={searchText} onChangeText={v => setSearchText(v)} />
        </Input>
        <Box className="mx-auto my-2">
            <StatusFilterPicker
            selectedValue={status}
            setSelectedValue={setStatus}
            hiddenOptions={userRole === 'admin' ? ['Rascunho'] : []}/>
            <Text className="mx-4">{requests.length} resultados</Text>
        </Box>
        <AddButton href='/requests/new'/>
        <RequestList data={requests} refreshCallback={refreshRequests} refreshing={refreshing}/>
    </Box>
    )
}