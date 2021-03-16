import { Account } from "./domain/account";

export interface IAccoountRepository {
    findById(id: number): Promise<Account | null>;
    findByUserId(userId: number): Promise<Account | null>;
    findAll(): Promise<Account[]>;
    save(account: Account): Promise<void>;
    update(account: Account): Promise<void>;
    deleteById(id: number): Promise<void>;
}