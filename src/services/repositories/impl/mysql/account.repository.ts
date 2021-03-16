import connector from "../../../../common/persistence/mysql.persistence";
import { Account } from "../../domain/account";
import { IAccoountRepository } from "../../Iaccount.repository";

export class AccountMysqlRepository implements IAccoountRepository {

    public async findById(id: number): Promise<Account | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM account WHERE id = ?',
            [id]
        );

        if (rows.length) {
            return rows[0];
        }

        return null;
    }

    public async findByUserId(userId: number): Promise<Account | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM account WHERE user_id = ?',
            [userId]
        );

        if (rows.length) {
            return rows[0];
        }

        return null;
    }

    public async findAll(): Promise<Account[]> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM account ORDER BY id DESC'
        );

        return rows as Account[];
    }

    public async save(account: Account): Promise<void> {
        const now = new Date();

        await connector.execute(
            'INSERT INTO account(user_id, product_id, amount, code, created_at) VALUES(?, ?, ?, ?, ?)',
            [account.user_id, account.product_id, account.amount, account.code, now]
        );
    }

    public async update(account: Account): Promise<void> {
        const now = new Date();

        await connector.execute(
            'UPDATE account SET user_id = ?, product_id = ?, amount = ?, code = ?, updated_at = ? WHERE id = ?',
            [account.user_id, account.product_id, account.amount, account.code, now, account.id]
        );
    }

    public async deleteById(id: number): Promise<void> {
        await connector.execute(
            'DELETE FROM account WHERE id = ?',
            [id]
        );
    }
}