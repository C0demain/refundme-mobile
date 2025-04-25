import Expense from "@/src/types/expense"

export default interface RequestType{
    _id: string
    code: string
    title: string
    project: {
        _id: string,
        code: string,
        title: string
    }
    status: string
    expenses: Expense[]
    isOverLimit: boolean
}