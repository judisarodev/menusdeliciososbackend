import AddressEntity from "../../address/domain/addressEntity";
import AddressRepositoryImplementation from "../../address/infraestructure/addressRepositoryImplementation";
import PhoneEntity from "../../phone/domain/phoneEntity";
import PhoneRepositoryImplementation from "../../phone/infraestructure/phoneRepositoryImplementation";
import PhoneCodeEntity from "../../phone_code/phoneCodeEntity";
import RestaurantTypeEntity from "../../restaurant_type/domain/restaurantTypeEntity";
import RestaurantEntity from "../domain/restaurantEntity";
import RestaurantRepositoryImplementation from "../infraestructure/restaurantRepositoryImplementation";

export default class CreateRestaurantUseCase {
    constructor(
        private restaurantRepositoryImplementation: RestaurantRepositoryImplementation,
        private addressRepositoryImplementation: AddressRepositoryImplementation,
        private phoneRepositoryImplementation: PhoneRepositoryImplementation,
    ){}

    async execute(restaurant: RestaurantEntity, phoneInfo: any, addressInfo: any, restaurantTypeInfo: any, password: string){
        const { phoneNumber, poneCode } = phoneInfo;
        const { code, country, phoneCodeId } = poneCode;
        const { address, addressDetails } = addressInfo;
        const { restaurantTypeName, restaurantTypeId } = restaurantTypeInfo;

        const phoneEntity = new PhoneEntity(phoneNumber, new PhoneCodeEntity(code, country, phoneCodeId));
        const phoneId = await this.phoneRepositoryImplementation.create(phoneEntity);
        phoneEntity.setPhoneId(phoneId);

        const addressEntity = new AddressEntity(address, addressDetails);
        const addressId = await this.addressRepositoryImplementation.create(addressEntity);
        addressEntity.setAddressId(addressId);

        const restaurantTypeEntity = new RestaurantTypeEntity(restaurantTypeName, restaurantTypeId);

        restaurant.setAddress(addressEntity);
        restaurant.setPhone(phoneEntity);
        restaurant.setRestaurantType(restaurantTypeEntity); 
        this.restaurantRepositoryImplementation.create(restaurant, password);
    }
}