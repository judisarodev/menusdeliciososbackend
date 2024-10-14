import express, { Router } from 'express';
import RouterPattern from '../../../domain/routerPattern';
import GetAllCountries from "../application/getAllCountriesUseCase";
import CountryRepositoryImplementation from "./countryRepositoryImplementation";

export default class CountryRouter implements RouterPattern {
    router: Router;
    getAllCountriesUseCase: GetAllCountries;
    countryRepositoryImplementation: CountryRepositoryImplementation;
    
    constructor(){
        this.router = express.Router();
        this.countryRepositoryImplementation = new CountryRepositoryImplementation();
        this.getAllCountriesUseCase = new GetAllCountries(this.countryRepositoryImplementation);
        this.setUpRoutes();
    }

    setUpRoutes(){
        /**
         * @swagger
         * /api/country/get-all:
         *   get:
         *      summary: Get all countries
         *      tags:
         *          - Country
         *      responses:
         *          200:
         *              description: Sucess
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: array
         *                          items:
         *                              type: object
         *                              properties:
         *                                  name:
         *                                      type: string
         *                                      example: "Argentina"
         *                                  phoneCode: 
         *                                      type: string
         *                                      example: "+54"
         *                                  countryId: 
         *                                      type: number
         *                                      example: 1
         *          500:
         *              description: Internal server error
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *                          properties:
         *                              message:
         *                                  type: string
         *                                  example: "No ha sido posible consultar los países"
         */
        this.router.get('/get-all', async (req: any, res: any) => {
            try{
                const countries = await this.getAllCountriesUseCase.execute();
                return res.status(200).json(countries);
            }catch(error){
                console.error(error);
                return res.status(200).json({ message: 'No ha sido posible consultar los países' });
            }
        });
    }

    getRouter(): Router {
        return this.router;
    }
}