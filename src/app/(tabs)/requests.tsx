import { Box } from "@/components/ui/box"
import { Heading } from "@/components/ui/heading"
import { getRequests, getRequestsByUser } from "@/src/api/requestService/request"
import { useEffect, useState } from "react"
import { FlatList, ListRenderItem, ListRenderItemInfo, Text } from 'react-native'
import Request from "@/src/types/request"
import { Accordion, AccordionContent, AccordionHeader, AccordionIcon, AccordionItem, AccordionTitleText, AccordionTrigger } from "@/components/ui/accordion"
import { ThemedText } from "@/src/components/ThemedText"
import { formatCurrency } from "@/src/utils/formatters/currencyFormatter"
import { formatDate } from "@/src/utils/formatters/dateFormatter"

const statusColors = {
    'Pendente': 'bg-yellow-300',
    'Aprovado': 'bg-green-300',
    'Recusado': 'bg-red-300',
    'Rascunho': 'bg-gray-300',
}

export default function ListRequests(){
    const [requests, setRequests] = useState<Request[]>([])

    const fetchRequests = async () => {
        const newRequests = await getRequestsByUser()
        setRequests(newRequests)
    }

    useEffect(()=>{
        fetchRequests()
    })

    return (
    <Box>
        <Heading size="2xl" className="px-3 py-3 my-3">Solicitações</Heading>
        <Accordion>
        <FlatList data={requests} keyExtractor={item => item._id} renderItem={({item}: ListRenderItemInfo<Request>) => 
            <AccordionItem value={item._id}>
            <AccordionHeader>
                <AccordionTrigger className="flex flex-row justify-between">
                    <ThemedText className="text-2xl">{item.title}</ThemedText>
                    <ThemedText className={`py-1 px-2 ${statusColors[item.status as keyof typeof statusColors]} rounded-full`}>{item.status}</ThemedText>
                </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent className="flex flex-col gap-4">
                <Box className="flex flex-row items-center gap-1">
                    <ThemedText className="mb-2 text-md">{item.project.title}</ThemedText>
                    <Text className="mb-2 text-sm text-slate-600">#{item.project.code}</Text>
                </Box>
                {item.expenses.map(expense =>
                    <Box>
                        <Text className="text-sm text-gray-400">{formatDate(expense.date)}</Text>
                        <Box className="flex flex-row justify-between">
                            <ThemedText>{expense.type}</ThemedText>
                            <ThemedText>{formatCurrency(expense.value)}</ThemedText>
                        </Box>
                    </Box>
                )}
            </AccordionContent>
        </AccordionItem>
        }>
        </FlatList>
        </Accordion>
    </Box>
    )
}