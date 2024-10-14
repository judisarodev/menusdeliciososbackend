import PaletteEntity from "../../palette/domain/paletteEntity";
import RestaurantEntity from "../../restaurant/domain/restaurantEntity";

export default class SuscriptionEntity {
    private suscriptionId: number | undefined;
    private months: number;
    private startDate: string; 
    private endDate: string;
    private price: number;
    private isActive: boolean;
    private restaurant: RestaurantEntity;
    
    constructor(months: number, startDate: string, endDate: string, price: number, isActive: boolean, restaurant: RestaurantEntity, suscriptionId?: number){
        this.months = months;
        this.startDate = startDate;
        this.endDate = endDate;
        this.price = price;
        this.isActive = isActive;
        this.restaurant = restaurant;
        this.suscriptionId = suscriptionId;
    }

    getSuscriptionId(): number | undefined {
        return this.suscriptionId;
    }

    setSuscriptionId(v: number){
        this.suscriptionId = v;
    }
}