import connector from "../../../../common/persistence/mysql.persistence";
import { Product } from "../../domain/product";
import { IProductRepository } from "../../Iproduct.repository";

export class ProductMySQLRepository implements IProductRepository {

    public async findAll(): Promise<Product[]> {
        const [rows] = await connector.execute(
            'SELECT * FROM product ORDER BY id DESC'
        );

        return rows as Product[];
    }

    public async findById(id: Number): Promise<Product | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM product WHERE id = ?',
            [id]
        );

        if (rows.length) {
            return rows[0] as Product;
        }

        return null;
    }

    public async findByUserIdAndCode(user_id: Number, code: string): Promise<Product | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM product WHERE user_id = ? AND code = ?',
            [user_id, code]
        );

        if (rows.length) {
            return rows[0] as Product;
        }

        return null;
    }

    public async save(product: Product): Promise<void> {
        const now = new Date();

        await connector.execute(
            'INSERT INTO product(user_id, code, name, status, created_at) VALUES(?, ?, ?, ?, ?)',
            [product.user_id, product.code, product.name, product.status, now]
        )
    }

    public async update(product: Product): Promise<void> {
        const now = new Date();

        await connector.execute(
            'UPDATE product SET status = ?, updated_at = ? WHERE id = ?',
            [product.status, now, product.id]
        )
    }

    public async deleteById(id: number): Promise<void> {
        await connector.execute(
            'DELETE FROM product WHERE id = ?',
            [id]
        )
    }
}