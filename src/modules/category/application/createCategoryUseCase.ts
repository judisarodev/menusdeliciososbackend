import { CategoryEntity } from "../domain/categoryEntity";
import CategoryRepositoryImplementation from "../infraestructure/categoryRepositoryImplementation";


export default class CreateCategoryUseCase {
    constructor(private categoryRepositoryImplementation: CategoryRepositoryImplementation){

    }

    async execute(categoryEntity: CategoryEntity, menuId: number){
        await this.categoryRepositoryImplementation.create(categoryEntity, menuId);
        return {
            response: { message: 'Categoría creada con éxito' },
            status: 201
        }
    }
}