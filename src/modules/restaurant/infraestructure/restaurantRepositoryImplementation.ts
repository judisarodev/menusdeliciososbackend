import SequelizeSetUp from "../../../infraestructure/config/sequelize";
import AddressEntity from "../../address/domain/addressEntity";
import RestaurantTypeEntity from "../../restaurant_type/domain/restaurantTypeEntity";
import RestaurantEntity from "../domain/restaurantEntity";
import RestaurantRepository from "../domain/restaurantRepository";
import bcrypt from 'bcrypt';

export default class RestaurantRepositoryImplementation implements RestaurantRepository{
    private models: any;

    constructor(){
        this.models = SequelizeSetUp.getModels();
    }

    async login(email: string, password: string): Promise<any> {
        const restaurant = await this.models.Restaurant.findOne({
            where: { email },
            attributes: ['restaurantId', 'password'],
        });
        if(restaurant){
            const isMatch = await bcrypt.compare(password, restaurant.password);
            if(isMatch){
                return {
                    isVerified: isMatch,
                    restaurantId: restaurant.restaurantId,
                };
            }
        }
        return {
            isVerified: false,
        };
    }

    async create(restaurantEntity: RestaurantEntity, password: string, restaurantTypeId: number, countryId: number, menuId: number): Promise<number> {
        try{
            const hashedPassword = await bcrypt.hash(password, 10); 
            const r = await this.models.Restaurant.create({
                name: restaurantEntity.getName(),
                email: restaurantEntity.getEmail(),
                phoneNumber: restaurantEntity.getPhone(),
                password: hashedPassword,
                restaurantTypeId,
                countryId,
                menuId
            });
            return r.restaurantId;
        }catch(error){
            console.error(error);
            throw error;
        }
    }
    
    async getById(restaurantId: number): Promise<RestaurantEntity> {
        try{
            const restaurant = await this.models.Restaurant.findOne({
                where: { restaurantId },
                attributes: ['restaurantId', 'name', 'email', 'logo'],
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
    
            const addressEntity = new AddressEntity(
                restaurant.address.address, 
                restaurant.address.addressDetails, 
                restaurant.address.addressId);
    
            const restaurantTypeEntity = new RestaurantTypeEntity(
                restaurant.restaurantType.name, 
                restaurant.restaurantType.restaurantTypeId);
    
            const restaurantEntity = new RestaurantEntity(
                restaurant.name, 
                restaurant.email, 
                '316777888', 
                true,
            );
            restaurantEntity.setRestaurantType(restaurantTypeEntity); 
    
            return restaurantEntity;
        }catch(error){
            console.error(error)
            throw error;
        }
    }

}