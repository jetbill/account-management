export interface Account {
    id: number;
    user_id: number;
    product_id: number;
    amount: number;
    code: string;
    created_at: Date | null;
    updated_at: Date | null;
}