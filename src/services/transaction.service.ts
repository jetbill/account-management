import { ITransactionRepository } from "./repositories/Itransaction.repository";
import { IAccoountRepository } from "./repositories/Iaccount.repository";
import { Transaction } from './repositories/domain/transaction';
import { TransactionCreateDto } from "../domain/transaction.dto";
import { TransactionType } from "../common/enums/transactiontype";
import { ApplicationException } from "../common/exceptions/application.exception";
import { Account } from './repositories/domain/account';

export class TransactionService {
    constructor(
        private readonly transactionRepository: ITransactionRepository,
        private readonly accountRepository: IAccoountRepository
    ) { }

    public async findById(id: number): Promise<Transaction | null> {
        return await this.transactionRepository.findById(id);
    }

    public async findAll(): Promise<Transaction[]> {
        return await this.transactionRepository.findAll();
    }

    public async findByAccount(user_id: number,account_id: number): Promise<Transaction[] | null> {
        return await this.transactionRepository.findByAcount(user_id, account_id);
    }

    public async save(transaction: TransactionCreateDto): Promise<void> {
        const account = await this.accountRepository.findByUserId(transaction.user_id);

        if (transaction.type === TransactionType.credit) {
            await this.creditTransaction(transaction, account);
        } else if (transaction.type === TransactionType.debit) {
            await this.debitTransaction(transaction, account);
        } else {
            throw new ApplicationException('Invalid Transaction type supplied.');
        }
    }

    private async creditTransaction(transaction: TransactionCreateDto, account: Account | null) {
        if (!account) {
            await this.accountRepository.save({
                amount: transaction.amount,
                user_id: transaction.user_id
                
            } as Account);
        } else {
            account.amount += transaction.amount;
            await this.accountRepository.update(account);
        }

        await this.transactionRepository.save(transaction as Transaction);
    }

    private async debitTransaction(entry: TransactionCreateDto, account: Account | null) {
        if (!account || account.amount < entry.amount) {
            throw new ApplicationException('User does not have enough money.');
        } else {
            account.amount -= entry.amount;

            await this.accountRepository.update(account);
            await this.transactionRepository.save(entry as Transaction);
        }
    }
}


