import React from "react"
import { FlatList, RefreshControl, ListRenderItemInfo } from "react-native"
import RequestItem from "./RequestItem"
import RequestType from "@/src/types/request"

interface RequestListProps{
    data: RequestType[]
    refreshCallback: Function
    refreshing: boolean
}
export function RequestList(props: RequestListProps){
    const {data, refreshCallback, refreshing} = props
    return (
        <FlatList 
        data={data}
        keyExtractor={item => item._id}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={() => refreshCallback()}/>
        }
        renderItem={({item}: ListRenderItemInfo<RequestType>) => 
        <RequestItem request={item}/>
    }/>
    )
}