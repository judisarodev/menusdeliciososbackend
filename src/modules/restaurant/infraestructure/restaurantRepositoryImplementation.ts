import SequelizeSetUp from "../../../infraestructure/config/sequelize";
import AddressEntity from "../../address/domain/addressEntity";
import PhoneEntity from "../../phone/domain/phoneEntity";
import PhoneCodeEntity from "../../phone_code/phoneCodeEntity";
import RestaurantTypeEntity from "../../restaurant_type/domain/restaurantTypeEntity";
import RestaurantEntity from "../domain/restaurantEntity";
import RestaurantRepository from "../domain/restaurantRepository";
import bcrypt from 'bcrypt';

export default class RestaurantRepositoryImplementation implements RestaurantRepository{
    private models: any;

    constructor(){
        this.models = SequelizeSetUp.getModels();
    }

    async login(email: string, password: string): Promise<string> {
        let jwt = '';

        const restaurant = await this.models.Restaurant.findOne({
            where: { email },
            attributes: ['restaurantId', 'password'],
        });

        if(restaurant){
            const isMatch = await bcrypt.compare(password, restaurant.password);
            if(isMatch){
                jwt = 'jwt-random'; 
            }
        }

        return jwt;
    
    }
    

    async create(restaurantEntity: RestaurantEntity): Promise<void> {
        await this.models.Restaurant.create({
            name: restaurantEntity.getName(),
            email: restaurantEntity.getEmail(),
            password: restaurantEntity.getPassword(),
            phoneId: restaurantEntity.getPhone().getPhoneId(),
            addressId: restaurantEntity.getAddress().getAddressId(),
            restaurantTypeId: restaurantEntity.getRestaurantType().getRestaurantTypeId()
        });
    }
    
    async getById(restaurantId: number): Promise<RestaurantEntity> {
        const restaurant = await this.models.Restaurant.findOne({
            where: { restaurantId },
            attributes: ['restaurantId', 'name', 'email', 'password', 'logo'],
            include: [{
                model: this.models.Phone,
                as: 'phone',
                include: [{
                    model: this.models.PhoneCode,
                    as: 'phoneCode'
                }]
            }, {
                model: this.models.Address,
                as: 'address'
            }, {
                model: this.models.RestaurantType,
                as: 'restaurantType'
            }]
        });

        const phoneCodeEntity = new PhoneCodeEntity(
            restaurant.phone.phoneCode.code, 
            restaurant.phone.phoneCode.country, 
            restaurant.phone.phoneCode.phoneCodeId);

        const phoneEntity = new PhoneEntity(
            restaurant.phone.phoneNumber, 
            phoneCodeEntity, 
            restaurant.phone.phoneId);

        const addressEntity = new AddressEntity(
            restaurant.address.address, 
            restaurant.address.addressDetails, 
            restaurant.address.addressId);

        const restaurantTypeEntity = new RestaurantTypeEntity(
            restaurant.restaurantType.name, 
            restaurant.restaurantType.restaurantTypeId);

        const restaurantEntity = new RestaurantEntity(
            restaurant.name, restaurant.email, 
            restaurant.password, restaurant.logo, 
            phoneEntity, addressEntity, 
            restaurantTypeEntity, restaurantId);

        return restaurantEntity;
    }

}