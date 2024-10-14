import AddressEntity from "../../address/domain/addressEntity";
import AddressRepositoryImplementation from "../../address/infraestructure/addressRepositoryImplementation";
import MenuRepositoryImplementation from "../../menu/infraestructure/menuRepositoryImplementation";
import RestaurantTypeEntity from "../../restaurant_type/domain/restaurantTypeEntity";
import RestaurantEntity from "../domain/restaurantEntity";
import RestaurantRepositoryImplementation from "../infraestructure/restaurantRepositoryImplementation";

export default class CreateRestaurantUseCase {
    constructor(
        private restaurantRepositoryImplementation: RestaurantRepositoryImplementation,
        private addressRepositoryImplementation: AddressRepositoryImplementation,
        private menuRepositoryImplementation: MenuRepositoryImplementation,
    ){}

    async execute(info: any){
        const { name, email, password, phoneNumber, address, addressDetails, countryId, restaurantTypeId } = info;
        
        const restaurantEntity = new RestaurantEntity(name, email, phoneNumber, false);
        const restaurantId = await this.restaurantRepositoryImplementation.create(restaurantEntity, password, restaurantTypeId, countryId);
        
        const addressEntity = new AddressEntity(address, addressDetails);
        this.addressRepositoryImplementation.create(addressEntity, restaurantId);
        
        const url = `/${ name }-${ new Date() } `;
        const paletteId = restaurantTypeId;
        const layout = 'linear';
        const font = 'sans-serif';
        this.menuRepositoryImplementation.create(layout, font, paletteId, url);

    }
}