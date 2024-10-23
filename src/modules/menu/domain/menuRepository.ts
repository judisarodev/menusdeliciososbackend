import PaletteEntity from "../../palette/domain/paletteEntity";
import MenuEntity from "./MenuEntity";

export default interface MenuRepository {
    create(layout: string, font: string, paletteId: number, url: string): Promise<void>;
    get(menuId: number): Promise<MenuEntity>;
    getPalettes(): Promise<PaletteEntity[]>;
    update(object: any, menuId: number): Promise<any>;
    getAllRestaurantUrls(): Promise<String[]>;
    getRestaurantIdByUrl(url: string): Promise<number>;
}