import express, { Router } from 'express';
import RouterPattern from '../../../domain/routerPattern';
import GetMenuUseCase from '../application/getMenuUseCase';
import ClientRepositoryImplementation from './clientRepositoryImplementation';

export default class ClientRouter implements RouterPattern {
    router: Router;
    getMenuUseCase: GetMenuUseCase;
    clientRepositoryImplmentation: ClientRepositoryImplementation;
    
    constructor(){
        this.router = express.Router();
        this.clientRepositoryImplmentation = new ClientRepositoryImplementation();
        this.getMenuUseCase = new GetMenuUseCase(this.clientRepositoryImplmentation);
        this.setUpRoutes();
    }

    setUpRoutes(){
        this.router.get('/get-menu/:url', async (req: any, res: any) => {
            try{
                const { url } = req.params;
                const menu = await this.getMenuUseCase.execute(url);
                return res.status(200).json(menu);
            }catch(error){
                console.error(error);
                return res.status(200).json({ message: 'No ha sido posible consultar el menú' });
            }
        });
    }

    getRouter(): Router {
        return this.router;
    }
}