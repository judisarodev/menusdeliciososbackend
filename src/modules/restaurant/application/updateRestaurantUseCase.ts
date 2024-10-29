import RestaurantRepositoryImplementation from "../infraestructure/restaurantRepositoryImplementation";

export default class UpdateRestaurantUseCase {
    constructor(private restaurantRepositoryImplementation: RestaurantRepositoryImplementation){}

    async execute(obj: any, restaurantId: number){
        const wasUpdated = await this.restaurantRepositoryImplementation.update(obj, restaurantId);
        if(wasUpdated){
            return {
                response: { message: 'Restaurante actualizado con éxito' },
                status: 200
            }
        }

        return {
            response: { message: 'No fue opsible actualizar el resaturante' },
            status: 401
        }
    }
}