import RestaurantRepositoryImplementation from "../infraestructure/restaurantRepositoryImplementation";

export default class LoginUseCase {
    models: any;

    constructor(private restaurantRepositoryImplementation: RestaurantRepositoryImplementation){

    }

    async execute(email: string, password: string){
        return this.restaurantRepositoryImplementation.login(email, password);
    }
}