import MenuEntity from "../../menu/domain/MenuEntity";

export interface ClientRepository{
    getMenu(url: string): Promise<MenuEntity>;
    makeSurvey(): Promise<void>;
}