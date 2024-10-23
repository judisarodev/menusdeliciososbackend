import express, { Router } from 'express';
import RouterPattern from '../../../domain/routerPattern';
import SurveyRepositoryImplementation from './surveyRepositoryImplementation';
import GetSurveysUseCase from '../application/getSurveysUseCase';

export default class SurveyRouter implements RouterPattern {
    router: Router;
    surveyRepositoryImplementation: SurveyRepositoryImplementation;
    getSurveysUseCase: GetSurveysUseCase;
    
    constructor(){
        this.router = express.Router();
        this.surveyRepositoryImplementation = new SurveyRepositoryImplementation();
        this.getSurveysUseCase = new GetSurveysUseCase(this.surveyRepositoryImplementation);
        this.setUpRoutes();
    }

    setUpRoutes(){
        this.router.get('/get-all/:restaurantId', async (req: any, res: any) => {
            try{
                const { page, rows } = req.query;
                const { restaurantId } = req.params;
                const { response, status } = await this.getSurveysUseCase.execute(page, rows, restaurantId);
                return res.status(status).json(response);
            }catch(error){
                console.error(error);
                return res.status(200).json({ message: 'No ha sido posible consultar las encuestas' });
            }
        });

    }

    getRouter(): Router {
        return this.router;
    }
}