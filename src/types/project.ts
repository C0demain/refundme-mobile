export default interface Project {
    _id: string;
    title: string;
    description: string;
    cc: string;
    limit: number;
    requests: [{
        _id: string;
        title: string;
        status: string;
        project: string;
        expenses: string[];
        user: string;
        code: string;
        _v: number
    }]
    code: string
    _v: number
}