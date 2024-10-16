import { Op } from "sequelize";
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

    async getMenuId(restaurantId: number): Promise<number>{
        try{
            const restaurant = await this.models.Restaurant.findByPk(restaurantId, {
                attributes: ['menuId']
            });
            if(restaurant){
                return restaurant.menuId;
            }
            return 0;
        }catch(error){
            throw error;
        }
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
                include: [{
                    model: this.models.Address,
                    as: 'addresses'
                }, {
                    model: this.models.RestaurantType,
                    as: 'restaurantType'
                }, {
                    model: this.models.Country,
                    as: 'country'
                }]
            });

            const restaurantEntity = new RestaurantEntity(
                restaurant.name, 
                restaurant.email, 
                restaurant.phoneNumber, 
                restaurant.isEmailVerified,
                restaurant.restaurantId
            );
    
            const restaurantTypeEntity = new RestaurantTypeEntity(
                restaurant.restaurantType.name, 
                restaurant.restaurantType.restaurantTypeId);
    
            restaurantEntity.setRestaurantType(restaurantTypeEntity); 
            
            console.log('restaurant.addresses', restaurant.addresses);
            if(restaurant.addresses){
                const addresses = restaurant.addresses.map((address: any) => {
                    return new AddressEntity(address.address, address.addressDetails, address.addressId);
                });
                restaurantEntity.setAddresses(addresses);
            }
            return restaurantEntity;
        }catch(error){
            console.error(error)
            throw error;
        }
    }

    async checkEmail(email: string): Promise<boolean>{
        try{
            const restaurant = await this.models.Restaurant.findOne({
                where: { email }
            });
            if(restaurant){
                return true;
            }
            return false;
        }catch(error){
            console.error(error);
            throw error; 
        }
    }

    async getImages(restaurantId: number): Promise<string[]> {
        try{
            const images = await this.models.Image.findAll({
                attributes: ['url', 'imageId'],
                where: {
                    restaurantId: {
                        [Op.or]: [restaurantId, null]
                    }
                }
            });
            
            return images;
        }catch(error){
            throw error;
        }
    }

}