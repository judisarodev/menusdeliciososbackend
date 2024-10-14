import Joi from "joi";
import AddressEntity from "../../address/domain/addressEntity";
import AddressRepositoryImplementation from "../../address/infraestructure/addressRepositoryImplementation";
import MenuRepositoryImplementation from "../../menu/infraestructure/menuRepositoryImplementation";
import RestaurantEntity from "../domain/restaurantEntity";
import RestaurantRepositoryImplementation from "../infraestructure/restaurantRepositoryImplementation";

export default class CreateRestaurantUseCase {
    private schema: any;

    constructor(
        private restaurantRepositoryImplementation: RestaurantRepositoryImplementation,
        private addressRepositoryImplementation: AddressRepositoryImplementation,
        private menuRepositoryImplementation: MenuRepositoryImplementation,
    ){
        this.schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            phoneNumber: Joi.string().alphanum().required(),
            address: Joi.string().required(),
            addressDetails: Joi.string(),
            countryId: Joi.number().required(),
            restaurantTypeId: Joi.number().required(),
        });
    }

    async execute(info: any){
        const { error } = this.schema.validate(info);
        if(error){
            return {
                response: { message: 'Bad request' },
                status: 400
            }
        }

        const { name, email, password, phoneNumber, address, addressDetails, countryId, restaurantTypeId } = info;
        
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0'); 
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear(); 

        const url = `/${ name }-${day}-${month}-${year}`;
        const paletteId = restaurantTypeId;
        const layout = 'linear';
        const font = 'sans-serif';
        const menuId = await this.menuRepositoryImplementation.create(layout, font, paletteId, url);
        
        const restaurantEntity = new RestaurantEntity(name, email, phoneNumber, false);
        const restaurantId = await this.restaurantRepositoryImplementation.create(restaurantEntity, password, restaurantTypeId, countryId, menuId);
        
        const addressEntity = new AddressEntity(address, addressDetails);
        await this.addressRepositoryImplementation.create(addressEntity, restaurantId);
    
        return {
            response: { message: 'Restaurante creado exitosamente' },
            status: 201
        }
    }
}