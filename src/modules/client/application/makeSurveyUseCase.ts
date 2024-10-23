import MenuRepositoryImplementation from "../../menu/infraestructure/menuRepositoryImplementation";
import RestaurantRepositoryImplementation from "../../restaurant/infraestructure/restaurantRepositoryImplementation";
import ClientRepositoryImplementation from "../infraestructure/clientRepositoryImplementation";

export default class MakeSurveyUseCase {
    clientRepositoryImplementation: ClientRepositoryImplementation;
    menuRepositoryImplementation: MenuRepositoryImplementation;

    constructor(clientRepositoryImplementation: ClientRepositoryImplementation, menuRepositoryImplementation: MenuRepositoryImplementation){
        this.clientRepositoryImplementation = clientRepositoryImplementation;
        this.menuRepositoryImplementation = menuRepositoryImplementation;
    }

    async execute(score: number, comments: string, url: string): Promise<any>{
        const restaurantId = await this.menuRepositoryImplementation.getRestaurantIdByUrl(url);
        await this.clientRepositoryImplementation.makeSurvey(score, comments, restaurantId);
        return {
            response: { message: 'Encuesta registrada con éxito' },
            status: 200
        }
    }
}