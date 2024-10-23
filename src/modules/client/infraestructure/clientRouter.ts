import express, { Router } from 'express';
import RouterPattern from '../../../domain/routerPattern';
import GetMenuUseCase from '../application/getMenuUseCase';
import ClientRepositoryImplementation from './clientRepositoryImplementation';
import MakeSurveyUseCase from '../application/makeSurveyUseCase';
import RestaurantRepositoryImplementation from '../../restaurant/infraestructure/restaurantRepositoryImplementation';
import MenuRepositoryImplementation from '../../menu/infraestructure/menuRepositoryImplementation';

export default class ClientRouter implements RouterPattern {
    router: Router;
    getMenuUseCase: GetMenuUseCase;
    makeSurveyUseCase: MakeSurveyUseCase;
    clientRepositoryImplmentation: ClientRepositoryImplementation;
    menuRepositoryImplementation: MenuRepositoryImplementation;
    
    constructor(){
        this.router = express.Router();
        this.clientRepositoryImplmentation = new ClientRepositoryImplementation();
        this.menuRepositoryImplementation = new MenuRepositoryImplementation();
        this.getMenuUseCase = new GetMenuUseCase(this.clientRepositoryImplmentation);
        this.makeSurveyUseCase = new MakeSurveyUseCase(this.clientRepositoryImplmentation, this.menuRepositoryImplementation);
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

        this.router.post('/make-survey/:url', async (req: any, res: any) => {
            try{
                const { url } = req.params;
                const { score, comments } = req.body;
                const { response, status } = await this.makeSurveyUseCase.execute(score, comments, url);
                return res.status(status).json(response);
            }catch(error){
                console.error(error);
                return res.status(500).json({ message: 'No ha sido posible registrar la encuesta.' });
            }
        });
    }

    getRouter(): Router {
        return this.router;
    }
}