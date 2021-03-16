import { TransactionType } from "../../../common/enums/transactiontype";

export interface Transaction {
    id: number;
    user_id: number;
    account_id: number;
    business: string;
    type: TransactionType;
    amount: number;
    created_at: Date | null;
    updated_at: Date | null;
}