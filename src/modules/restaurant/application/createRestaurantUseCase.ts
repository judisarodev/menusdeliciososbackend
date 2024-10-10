import AddressEntity from "../../address/domain/addressEntity";
import AddressRepositoryImplementation from "../../address/infraestructure/addressRepositoryImplementation";
import RestaurantTypeEntity from "../../restaurant_type/domain/restaurantTypeEntity";
import RestaurantEntity from "../domain/restaurantEntity";
import RestaurantRepositoryImplementation from "../infraestructure/restaurantRepositoryImplementation";

export default class CreateRestaurantUseCase {
    constructor(
        private restaurantRepositoryImplementation: RestaurantRepositoryImplementation,
        private addressRepositoryImplementation: AddressRepositoryImplementation,
    ){}

    async execute(restaurant: RestaurantEntity, addressInfo: AddressEntity, restaurantTypeInfo: any, password: string){
        /*const restaurantEntity = new RestaurantEntity(name, email, phoneNumber);

        const { restaurantTypeName, restaurantTypeId } = restaurantTypeInfo;
        const restaurantTypeEntity = new RestaurantTypeEntity(restaurantTypeName, restaurantTypeId);

        restaurant.setRestaurantType(restaurantTypeEntity); 
        this.restaurantRepositoryImplementation.create(restaurant, password);*/
    }
}