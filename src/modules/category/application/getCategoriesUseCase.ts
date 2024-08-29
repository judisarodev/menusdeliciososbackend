import CategoryRepositoryImplementation from "../infraestructure/categoryRepositoryImplementation";

export default class GetCategoriesUseCase{
    constructor(private categoryRepositoryImplementation: CategoryRepositoryImplementation){

    }

    execute(){
        return this.categoryRepositoryImplementation.getAll();
    }
}