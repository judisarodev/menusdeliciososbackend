import RestaurantEntity from "../../restaurant/domain/restaurantEntity";

export default class PaletteEntity {
    private paletteId: number | undefined;
    private primaryColor: string;
    private secondaryColor: string;
    private primaryTextColor: string;
    private secondaryTextColor: string;

    constructor(primaryColor: string, secondaryColor: string, primaryTextColor: string, secondaryTextColor: string, paletteId?: number){
        this.paletteId = paletteId;
        this.primaryColor = primaryColor;
        this.secondaryColor = secondaryColor;
        this.primaryTextColor = primaryTextColor;
        this.secondaryTextColor = secondaryTextColor;
    }

    getPaletteId(): number | undefined{
        return this.paletteId;
    }

    getPrimaryColor(): string {
        return this.primaryColor;
    }

    getSecondaryColor(): string {
        return this.secondaryColor; 
    }

    getPrimaryTextColor(): string{
        return this.primaryTextColor;
    }

    getSecondaryTextColor(): string {
        return this.secondaryTextColor;
    }
}