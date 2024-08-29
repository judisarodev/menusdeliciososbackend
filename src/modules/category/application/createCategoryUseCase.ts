import { CategoryEntity } from "../domain/categoryEntity";
import CategoryRepositoryImplementation from "../infraestructure/categoryRepositoryImplementation";


export default class CreateCategoryUseCase {
    constructor(private categoryRepositoryImplementation: CategoryRepositoryImplementation){

    }

    async execute(categoryEntity: CategoryEntity){
        await this.categoryRepositoryImplementation.create(categoryEntity);
    }
}