export interface ITransaction {
    id: string | number
    type: string
    amount: number
    description: string
    category: string
    created_at: string 
}