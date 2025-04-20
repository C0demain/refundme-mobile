import { Text } from 'react-native'

const statusColors = {
    'Pendente': 'bg-yellow-300',
    'Aprovado': 'bg-green-300',
    'Recusado': 'bg-red-300',
    'Rascunho': 'bg-gray-300',
}

export default function StatusBadge({status }: { status: string | undefined }){
    return <Text className={`${statusColors[status as keyof typeof statusColors]} py-1 px-2 rounded-full`}>{status}</Text>
}