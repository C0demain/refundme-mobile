import { Box } from "@/components/ui/box";
import { router } from "expo-router";
import React from "react";
import { FlatList, ListRenderItemInfo, RefreshControl, TouchableOpacity } from "react-native";
import StatusBadge from "./StatusBadge";
import { Text } from "@/components/ui/text";
import RequestType from "@/src/types/request";

interface PropType{
    request: RequestType
}

export default function RequestItem(props: PropType){
    const {request} = props
    
    return (
        <TouchableOpacity
        className="flex-row justify-between items-center p-3"
        onPress={() => router.push({pathname: '/requests/[request_id]', params: { request_id: request._id} })}>
            <Box className="gap-1 flex-1">
                <Text className="text-lg">{request.title}</Text>
                <Text className="text-gray-300 text-sm">#{request.code}</Text>
            </Box>
            <StatusBadge status={request.status}/>
        </TouchableOpacity>
    )
}