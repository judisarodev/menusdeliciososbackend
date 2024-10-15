import MenuRepositoryImplementation from "../../menu/infraestructure/menuRepositoryImplementation";

export default class GetMenuUseCase {

    constructor(
        private menuRepositoryImplementation: MenuRepositoryImplementation,
    ){}

    async execute(menuId: number){
        const menu = await this.menuRepositoryImplementation.get(menuId);
        return {
            response: menu,
            status: 200
        }
    }
}