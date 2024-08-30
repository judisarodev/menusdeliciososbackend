import CategoryRepositoryImplementation from "../infraestructure/categoryRepositoryImplementation";


export default class GetCategoryByIdUseCase {
    constructor(private categoryRepositoryImplementation: CategoryRepositoryImplementation){

    }

    async execute(categoryId: number, restaurantId: number){
        return await this.categoryRepositoryImplementation.getById(categoryId, restaurantId);
    }
}