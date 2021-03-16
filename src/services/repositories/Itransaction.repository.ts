import { Transaction } from "./domain/transaction";

export interface ITransactionRepository {
    findById(id: number): Promise<Transaction | null>;
    findByAcount(user_id: number, account_id: number): Promise<Transaction[] | null>;
    findAll(): Promise<Transaction[]>;
    save(transaction: Transaction): Promise<void>;
    update(transaction: Transaction): Promise<void>;
    deleteById(id: number): Promise<void>;
}