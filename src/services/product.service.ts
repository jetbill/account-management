import { IProductRepository } from "./repositories/Iproduct.repository";
import { Product } from "./repositories/domain/product";
import { ApplicationException } from "../common/exceptions/application.exception";
import { ProductUpdateDto, ProductCreateDto } from "../domain/product.dto";

export class ProductService {
    constructor(
        private readonly productRepository: IProductRepository
    ) { }

    public async findById(id: number): Promise<Product | null> {
        return await this.productRepository.findById(id);
    }

    public async findAll(): Promise<Product[]> {
        return await this.productRepository.findAll();
    }

    public async save(product: ProductCreateDto): Promise<void> {
        const originalProduct = await this.productRepository.findByUserIdAndCode(product.user_id, product.code);

        if (!originalProduct) {
            await this.productRepository.save(product as Product);
        } else {
            throw new ApplicationException('Product already exists.');
        }
    }

    public async update(id: number, product: ProductUpdateDto): Promise<void> {
        let originalProduct = await this.productRepository.findById(id);

        if (originalProduct) {
            
            originalProduct.status = product.status;

            await this.productRepository.update(originalProduct);
        } else {
            throw new ApplicationException('Product not found.');
        }
    }

    public async deleteById(id: number): Promise<void> {
        await this.productRepository.deleteById(id);
    }
}