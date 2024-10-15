import RestaurantRepositoryImplementation from "../infraestructure/restaurantRepositoryImplementation";

export default class GetImagesUseCase {
    models: any;

    constructor(private restaurantRepositoryImplementation: RestaurantRepositoryImplementation){

    }

    async execute(restaurantId: number){
        const images = await this.restaurantRepositoryImplementation.getImages(restaurantId);
        return {
            response: images,
            status: 200,
        }
    }
}