import connector from "../../../../common/persistence/mysql.persistence";
import { ITransactionRepository } from "../../Itransaction.repository";
import { Transaction } from "../../domain/transaction";

export class TransactionMySQLRepository implements ITransactionRepository {
    public async findById(id: number): Promise<Transaction | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM transactions WHERE id = ?',
            [id]
        );

        if (rows.length) {
            return rows[0];
        }

        return null;
    }

    public async findByAcount(user_id: number, account_id: number): Promise<Transaction[] | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM transactions WHERE user_id = ? AND account_id = ?',
            [user_id, account_id]
        );

        if (rows.length) {
            return rows as Transaction[];
        }

        return null;
    }

    public async findAll(): Promise<Transaction[]> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM transactions ORDER BY id DESC'
        );

        return rows as Transaction[];
    }

    public async save(transaction: Transaction): Promise<void> {
        const now = new Date();

        await connector.execute(
            'INSERT INTO transactions(user_id, account_id, business, type, amount, created_at) VALUES(?, ?, ?, ?, ?, ?)',
            [transaction.user_id, transaction.account_id, transaction.business, transaction.type,  transaction.amount, now]
        );
    }

    public async update(product: Transaction): Promise<void> {
        const now = new Date();

        await connector.execute(
            'UPDATE transactions SET user_id = ?, account_id = ?, business = ?, type = ?, amount = ?, updated_at = ? WHERE id = ?',
            [product.user_id, product.account_id, product.business, product.type, product.amount, now, product.id]
        );
    }

    public async deleteById(id: number): Promise<void> {
        await connector.execute(
            'DELETE FROM transactions WHERE id = ?',
            [id]
        );
    }
}