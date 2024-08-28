import express from 'express';
import DishRouter from '../../modules/dish/infraestructure/dishRouter';

export default class Router {
    router: any;
    dishRouter: DishRouter;
    
    constructor(){
        this.router = express.Router();
        this.dishRouter = new DishRouter();
        this.setUpRoutes();
    }

    setUpRoutes(){
        this.router.use('/product', this.dishRouter.getRouter());
        this.router.get('/say-hi', async (req: any, res: any) => {
            return res.send('Hi');
        });
    }

    getRouter(): any {
        return this.router;
    }
}