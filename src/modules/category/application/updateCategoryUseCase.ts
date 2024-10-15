import CategoryRepositoryImplementation from "../infraestructure/categoryRepositoryImplementation";
export default class UpdateCategoryUseCase {
    constructor(private categoryRepositoryImplementation: CategoryRepositoryImplementation){}
    async execute(name: string, icon: string, categoryId: number){
        await this.categoryRepositoryImplementation.update(name, icon, categoryId);
        return {
            response: { message: 'Categoría actualizada con éxito' },
            status: 200
        }
    }
}