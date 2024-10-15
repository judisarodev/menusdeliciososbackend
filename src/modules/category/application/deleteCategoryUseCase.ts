import CategoryRepositoryImplementation from "../infraestructure/categoryRepositoryImplementation";

export default class DeleteCategoryUseCase {
    constructor(private categoryRepositoryImplementation: CategoryRepositoryImplementation){}

    async execute(categoryId: number){
        await this.categoryRepositoryImplementation.delete(categoryId);
        return {
            response: { message: 'Categoría eliminada con éxtio' },
            status: 200
        }
    }
}