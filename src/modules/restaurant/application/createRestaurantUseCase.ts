import Joi from "joi";
import AddressEntity from "../../address/domain/addressEntity";
import AddressRepositoryImplementation from "../../address/infraestructure/addressRepositoryImplementation";
import MenuRepositoryImplementation from "../../menu/infraestructure/menuRepositoryImplementation";
import RestaurantEntity from "../domain/restaurantEntity";
import RestaurantRepositoryImplementation from "../infraestructure/restaurantRepositoryImplementation";
import AuthenticationPatternImplementation from "../../../infraestructure/authentication/authenticationPatternInplementation";

export default class CreateRestaurantUseCase {
    private schema: any;

    constructor(
        private restaurantRepositoryImplementation: RestaurantRepositoryImplementation,
        private addressRepositoryImplementation: AddressRepositoryImplementation,
        private menuRepositoryImplementation: MenuRepositoryImplementation,
        private authenticationPatternImplementation: AuthenticationPatternImplementation,
    ){
        this.schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            phoneNumber: Joi.string().alphanum().required(),
            address: Joi.string().required(),
            addressDetails: Joi.string().allow('').optional(),
            countryId: Joi.number().required(),
            restaurantTypeId: Joi.number().required(),
        });
    }

    async execute(info: any){
        const { error } = this.schema.validate(info);
        if(error){
            return {
                response: { message: 'Bad request: ' + error.message },
                status: 400
            }
        }
        const { name, email, password, phoneNumber, address, addressDetails, countryId, restaurantTypeId } = info;

        const duplicatedEmail = await this.checkEmail(email);
        if(duplicatedEmail){
            return {
                response: {  message: 'El correo electrónico ya está registrado'},
                status: 409
            }
        }

        const restaurantId = await this.createRestaurant(restaurantTypeId, name, email, phoneNumber, password, countryId);
        await this.createAddress(address, addressDetails, restaurantId);

        const jwt = await this.authenticationPatternImplementation.signToken(restaurantId);
    
        return {
            response: {
                message: 'Restaurante creado exitosamente',
                jwt
            },
            status: 201
        }
    }

    async checkEmail(email: string): Promise<boolean>{
        return await this.restaurantRepositoryImplementation.checkEmail(email);
    }

    async createRestaurant(restaurantTypeId: number, name: string, email: string, phoneNumber: string, password: string, countryId: number): Promise<number>{
        const paletteId = restaurantTypeId;
        const layout = 'linear';
        const font = 'sans-serif';
        const url = this.createUrl(name);
        const menuId = await this.menuRepositoryImplementation.create(layout, font, paletteId, url);
        
        const restaurantEntity = new RestaurantEntity(name, email, phoneNumber, false);
        const restaurantId = await this.restaurantRepositoryImplementation.create(restaurantEntity, password, restaurantTypeId, countryId, menuId);
        return restaurantId;
    }

    async createAddress(address: string, addressDetails: string, restaurantId: number): Promise<void>{
        const addressEntity = new AddressEntity(address, addressDetails);
        await this.addressRepositoryImplementation.create(addressEntity, restaurantId);
    }

    createUrl(restaurantName: string): string{
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0'); 
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear(); 

        const url = `/${ restaurantName.split(" ").join("-") }-${day}-${month}-${year}`;
        return url;
    }
}