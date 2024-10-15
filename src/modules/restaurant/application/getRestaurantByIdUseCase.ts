import RestaurantRepositoryImplementation from "../infraestructure/restaurantRepositoryImplementation";

export default class GetRestaurantByIdUseCase {
    constructor(
        private restaurantRepositoryImplementation: RestaurantRepositoryImplementation
    ){}

    async execute(restaurantId: number){
        const r = await this.restaurantRepositoryImplementation.getById(restaurantId);
        const menuId = await this.restaurantRepositoryImplementation.getMenuId(restaurantId);
        return {
            ...r,
            menuId,
        }
    }
}