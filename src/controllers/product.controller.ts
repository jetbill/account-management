import { Request, Response } from 'express';
import { route, GET, POST, PUT, DELETE } from "awilix-express";
import { ProductService } from '../services/product.service';
import { BaseController } from '../common/controllers/base.controller';
import { ProductCreateDto, ProductUpdateDto } from '../domain/product.dto';

@route('/v1/products')
export class SubscriptionController extends BaseController {
    constructor(
        private readonly productService: ProductService
    ) {
        super();
    }

    @GET()
    public async all(req: Request, res: Response) {
        try {
            res.send(
                await this.productService.findAll()
            );
        } catch (error) {
            this.handleException(error, res);
        }
    }

    
    @route('/:id')
    @GET()
    public async findById(req: Request, res: Response) {
        console.log(req.params.id);
        try {
            const id = parseInt(req.params.id);

            const result = await this.productService.findById(id);

            if (result) {
                res.json(result);
            } else {
                return res.status(400).json({ error: 'Product not found' })
                
            }
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @POST()
    public async save(req: Request, res: Response) {
        try {
            await this.productService.save({
                user_id: req.body.user_id,
                code: req.body.code,
                name: req.body.name,
                status: req.body.status
            } as ProductCreateDto);

            res.json(req.body );
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @route('/:id')
    @PUT()
    public async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);

            await this.productService.update(id, {
                status: req.body.status                
            } as ProductUpdateDto);

            res.json(req.body);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @route('/:id')
    @DELETE()
    public async deleteById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);

            await this.productService.deleteById(id);

            res.send();
        } catch (error) {
            this.handleException(error, res);
        }
    }
}