import MenuRepositoryImplementation from "../../menu/infraestructure/menuRepositoryImplementation";

export default class GetPalettesUseCase {

    constructor(
        private menuRepositoryImplementation: MenuRepositoryImplementation,
    ){}

    async execute(){
        const palettes = await this.menuRepositoryImplementation.getPalettes();
        return {
            response: palettes,
            status: 200
        }
    }
}