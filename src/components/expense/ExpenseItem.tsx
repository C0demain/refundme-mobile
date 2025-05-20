import { Badge, BadgeText } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { Icon, PaperclipIcon } from "@/components/ui/icon";
import Expense from "@/src/types/expense";
import { formatCurrency } from "@/src/utils/formatters/currencyFormatter";
import { formatDate } from "@/src/utils/formatters/dateFormatter";
import { Text } from "react-native";

export default function ExpenseItem({ expense }: { expense: Expense }) {
    return (
        <Box>
            <Box className="flex flex-row justify-between items-center">
                <Text className={`text-lg ${!expense.description ? "text-gray-400 italic" : ""}`}>
                    {expense.description ? expense.description : "Sem descrição"}
                </Text>
                <Text className="text-sm text-gray-500">
                    {formatDate(expense.date)}
                </Text>
            </Box>

            <Box className="flex flex-row justify-between items-center">
                <Badge size="sm">
                    <BadgeText>{expense.type}</BadgeText>
                </Badge>
                <Text>{formatCurrency(expense.value)}</Text>
            </Box>
            {expense.image && <Box className="flex-row items-end justify-between">
                <Icon size="sm" />
                <Icon as={PaperclipIcon} size="sm" />
            </Box>}
        </Box>
    )
}