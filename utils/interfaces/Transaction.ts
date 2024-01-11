export interface ITransaction {
    id: string | number
    type: string
    amount: number
    description: string
    category: string
    created_at: string 
}

export interface IPeriod {
    from: Date | string;
    to: Date | string;
}
