import SequelizeSetUp from "../../../infraestructure/config/sequelize";
import SurveyEntity from "../domain/surveyEntity";
import { SurveyRepository } from "../domain/surveyRepository";


export default class SurveyRepositoryImplementation implements SurveyRepository{
    models: any = SequelizeSetUp.getModels();
    
    async getAll(page: number, rows: number, restaurantId: number): Promise<{surveys: SurveyEntity[], totalRecords: number}> {
        const surveysSq = await this.models.Survey.findAll({
            where: {
                restaurantId,
            }
        });
        const totalRecords = await this.models.Survey.count({
            where: {
                restaurantId,
            }
        });

        const surveys = surveysSq.map((s: any) => {
            return new SurveyEntity(s.score, s.comments, s.time, s.surveyId);
        });

        return {
            surveys,
            totalRecords,
        }
    }

}