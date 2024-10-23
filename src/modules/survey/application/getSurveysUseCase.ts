import SurveyRepositoryImplementation from "../infraestructure/surveyRepositoryImplementation";

export default class GetSurveysUseCase {
    surveyRepositoryImplementation: SurveyRepositoryImplementation;

    constructor(surveyRepositoryImplementation: SurveyRepositoryImplementation){
        this.surveyRepositoryImplementation = surveyRepositoryImplementation;
    }

    async execute(page: number = 1, rows: number = 10, restaurantId: number){
        const response = await this.surveyRepositoryImplementation.getAll(page, rows, restaurantId);
        return {
            response, 
            status: 200
        }
    }
}