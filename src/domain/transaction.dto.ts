import { TransactionType } from "../common/enums/transactiontype";

interface TransactionCreateDto {
    user_id: number;
    account_id: number;
    amount: number;
    business: string;
    type: TransactionType;

}

export {
    TransactionCreateDto
}