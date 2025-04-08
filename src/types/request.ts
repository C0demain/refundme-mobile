export default interface Request{
    _id: string
    code: string
    title: string
    project: {
        _id: string,
        code: string,
        title: string
    }
    status: string
    expenses: any[]
}