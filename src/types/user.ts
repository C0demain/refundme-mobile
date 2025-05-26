export interface user {
  _id: string;
  name: string;
  email: string;
  role: string;
  __v: number;
  projects: string[];
  requests: {
    _id: string;
    title: string;
    status: string;
    project: string;
    expenses: string[];
    user: string;
    code: string;
    __v: number;
    isOverLimit?: boolean;
  }[];
}
