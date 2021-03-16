import { Request, Response } from 'express';
import { route, GET } from "awilix-express";
import { TestService } from '../services/test.service';

@route('/health')
export class CheckController {
    constructor(private readonly testService: TestService) { }
    
  

    @route('/check')
    @GET()
    public test(req: Request, res: Response): void {
        res.send(this.testService.get());
    }

    // Endpoint to check user payload from jwt
    @route('/user-payload')
    @GET()
    public userPayload(req: Request, res: Response): void {
        res.send((req as any).user);
    }
}