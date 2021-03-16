export interface Product {
    id: number;
    code: string;
    user_id: number;
    name: string;
    status: boolean;
    created_at: Date | null,
    updated_at: Date | null
};