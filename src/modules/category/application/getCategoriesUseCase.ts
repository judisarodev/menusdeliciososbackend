import CategoryRepositoryImplementation from "../infraestructure/categoryRepositoryImplementation";

export default class GetCategoriesUseCase{
    constructor(private categoryRepositoryImplementation: CategoryRepositoryImplementation){

    }

    execute(restaurantId: number){
        return this.categoryRepositoryImplementation.getAll(restaurantId);
    }
}