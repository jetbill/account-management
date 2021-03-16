import express = require('express');
import { createContainer, asClass } from "awilix";
import { scopePerRequest } from "awilix-express";
import { TestService } from "./services/test.service";
import { ProductMySQLRepository } from './services/repositories/impl/mysql/product.repository';
import { ProductService } from './services/product.service';
import { TransactionMySQLRepository } from './services/repositories/impl/mysql/transaction.repository';
import { AccountMysqlRepository } from './services/repositories/impl/mysql/account.repository';
import { TransactionService } from './services/transaction.service';


export default (app: express.Application): void => {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });

    container.register({
       
        productRepository: asClass(ProductMySQLRepository).scoped(),
        transactionRepository: asClass(TransactionMySQLRepository).scoped(),
        accountRepository: asClass(AccountMysqlRepository).scoped(),

        
        productService: asClass(ProductService).scoped(),
        transactionService: asClass(TransactionService).scoped(),
        testService: asClass(TestService).scoped()
    });

    app.use(scopePerRequest(container));
};