import { CategoryEntity } from "../../category/domain/categoryEntity";
import ImageEntity from "../../image/domain/imageEntity";
import PaletteEntity from "../../palette/domain/paletteEntity";

export default class MenuEntity {
    private menuId: number | undefined;
    private showDescription: boolean;
    private showImage: boolean;
    private showNavigation: boolean;
    private showIcons: boolean;
    private layout: string;
    private font: string; 
    private palette: PaletteEntity | undefined;
    private url: string;
    private categories: CategoryEntity[] | undefined;
    private backgroundImage: ImageEntity | undefined;

    constructor(showDescription: boolean, showImage: boolean, showNavigation: boolean, showIcons: boolean, layout: string, font: string,  url: string, menuId?: number){
        this.showDescription = showDescription;
        this.showImage = showImage;
        this.showNavigation = showNavigation;
        this.showIcons = showIcons;
        this.layout = layout;
        this.font = font;
        this.menuId = menuId;
        this.url = url;
    }

    getCategories(): CategoryEntity[] | undefined{
        return this.categories;
    }

    setBackgroundImage(image: ImageEntity) {
        this.backgroundImage = image;
    }

    getBackgroundImage(): ImageEntity | undefined {
        return this.backgroundImage;
    }

    setCategories(categories: CategoryEntity[]){
        this.categories = categories;
    }

    getMenuId(): number | undefined {
        return this.menuId;
    }

    getShowDescription(): boolean {
        return this.showDescription;
    }

    getShowImage(): boolean {
        return this.showImage;
    }

    getShowNavigation(): boolean {
        return this.showNavigation;
    }

    getShowIcons(): boolean {
        return this.showIcons;
    }

    getLayout(): string{
        return this.layout;
    }

    getFont(): string {
        return this.font;
    }

    getPalette(): PaletteEntity | undefined {
        return this.palette;
    }

    setMenuId(id: number){
        this.menuId = id;
    }

    setShowDescription(v: boolean){
        this.showDescription = v;
    }

    setShowImage(v: boolean){
        this.showImage = v;
    }

    setShowNavigation(v: boolean){
        this.showNavigation = v;
    }

    setShowIcons(v: boolean){
        this.showIcons = v;
    }

    setLauout(v: string){
        this.layout = v;
    }

    setFont(v: string){
        this.font = v;
    }

    getUrl(): string {
        return this.url;
    }

    setUrl(url: string): void {
        this.url = url;
    }

    setPalette(p: PaletteEntity){
        this.palette = p;
    }
}