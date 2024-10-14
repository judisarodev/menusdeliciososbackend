import SequelizeSetUp from "../../../infraestructure/config/sequelize";
import MenuRepository from "../domain/menuRepository";

export default class MenuRepositoryImplementation implements MenuRepository{
    private models: any;

    constructor(){
        this.models = SequelizeSetUp.getModels();
    }

    async create(layout: string, font: string, paletteId: number, url: string){
        return await this.models.Menu.create({
            showDescription: true,
            showImge: true,
            showNavigation: true,
            showIcons: true,
            layout,
            url,
            font,
            paletteId,
        });
    }
    
}