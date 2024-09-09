import CategoryRepositoryImplementation from "../infraestructure/categoryRepositoryImplementation";


export default class UpdateImageUseCase {
    constructor(private categoryRepositoryImplementation: CategoryRepositoryImplementation){

    }

    async execute(categoryId: number, image: string){
        return await this.categoryRepositoryImplementation.updateImage(categoryId, image);
    }
}