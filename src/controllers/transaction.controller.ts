import { Request, Response } from 'express';
import { route, GET, POST } from "awilix-express";
import { BaseController } from '../common/controllers/base.controller';
import { TransactionService } from '../services/transaction.service';
import { TransactionCreateDto } from '../domain/transaction.dto';

@route('/v1/transactions')
export class TransactionController extends BaseController {
    constructor(
        private readonly transactionService: TransactionService
    ) {
        super();
    }

    @GET()
    public async findAll(req: Request, res: Response) {
        try {
            res.send(
                await this.transactionService.findAll()
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

            const result = await this.transactionService.findById(id);

            if (result) {
                res.send(result);
            } else {
                res.status(404);
                res.send('transaction not found');
            }
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @route('data/:id/:id')
    @GET()
    public async findByAccount(req: Request, res: Response) {
        console.log(req.params.id);
        try {
            const id = parseInt(req.params.id);

            const result = await this.transactionService.findByAccount(id,id);

            if (result) {
                res.send(result);
            } else {
                res.status(404);
                res.send('transaction not found');
            }
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @POST()
    public async save(req: Request, res: Response) {
        try {
            await this.transactionService.save({
                type: req.body.type,
                amount: req.body.amount,
                user_id: req.body.user_id,
                account_id: req.body.account_id,
                business: req.body.business
            } as TransactionCreateDto);

            res.send('successful transaction');
        } catch (error) {
            this.handleException(error, res);
        }
    }
}