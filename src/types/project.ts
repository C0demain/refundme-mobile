import Expense from "./expense";

export default interface Project {
    _id: string;
    title: string;
    description: string;
    cc: string;
    limit: number;
    requests: [
        {_id: string,
        code: string,
        title: string,
        project: {
            _id: string,
            code: string,
            title: string
        },
        status: string,
        expenses: Expense[],
        isOverLimit: boolean}
    ],
    users: [{
        _id:string;
        email: string;
        name: string;
    }];
    code: string;
    _v: number;
}