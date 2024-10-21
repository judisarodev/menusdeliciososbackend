import RestaurantRepositoryImplementation from "../infraestructure/restaurantRepositoryImplementation";

export default class GetImagesUseCase {
    models: any;

    constructor(private restaurantRepositoryImplementation: RestaurantRepositoryImplementation){

    }

    async execute(restaurantId: number, background?: boolean ){
        if(background == true){
            const images = await this.restaurantRepositoryImplementation.getBackgroundImages(restaurantId);
            return {
                response: images,
                status: 200,
            }
        }
        const images = await this.restaurantRepositoryImplementation.getImages(restaurantId);
        return {
            response: images,
            status: 200,
        }
    }
}