import RestaurantEntity from "../../restaurant/domain/restaurantEntity";

export default class MenuEntity {
    private menuId: number | undefined;
    private showDescription: boolean;
    private showImage: boolean;
    private showNavigation: boolean;
    private showIcons: boolean;
    private layout: string;
    private font: string; 
    private restaurant: RestaurantEntity;

    constructor(showDescription: boolean, showImage: boolean, showNavigation: boolean, showIcons: boolean, layout: string, font: string, restaurant: RestaurantEntity, menuId?: number){
        this.showDescription = showDescription;
        this.showImage = showImage;
        this.showNavigation = showNavigation;
        this.showIcons = showIcons;
        this.layout = layout;
        this.font = font;
        this.menuId = menuId;
        this.restaurant = restaurant; 
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

    getRestaurant(): RestaurantEntity {
        return this.restaurant;
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
}