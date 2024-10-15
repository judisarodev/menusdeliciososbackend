import MenuEntity from "./MenuEntity";

export default interface MenuRepository {
    create(layout: string, font: string, paletteId: number, url: string): Promise<void>;
    get(menuId: number): Promise<MenuEntity>;
}