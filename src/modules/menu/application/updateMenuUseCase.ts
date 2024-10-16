import MenuRepositoryImplementation from "../../menu/infraestructure/menuRepositoryImplementation";

export default class UpdateMenuUseCase {

    constructor(
        private menuRepositoryImplementation: MenuRepositoryImplementation,
    ){}

    async execute(object: any, menuId: number){
        const [rows] = await this.menuRepositoryImplementation.update(object, menuId);
        if(rows){
            return {
                response: { message: 'Menú actualizado con éxito' },
                status: 200
            }
        }

        return {
            response: { message: 'No hubo actualización' },
            status: 500
        }
    }
}