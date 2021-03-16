import { Product } from "./domain/product";

export interface IProductRepository {
    findAll(): Promise<Product[]>;
    findById(id: number): Promise<Product | null>;
    findByUserIdAndCode(user_id: number, code: string): Promise<Product | null>;
    save(product: Product): Promise<void>;
    update(product: Product): Promise<void>;
    deleteById(id: number): Promise<void>;
}