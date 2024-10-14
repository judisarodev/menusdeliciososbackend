import AddressEntity from "../../address/domain/addressEntity";
import MenuEntity from "../../menu/domain/MenuEntity";
import RestaurantTypeEntity from "../../restaurant_type/domain/restaurantTypeEntity";

export default class RestaurantEntity {
    private surveyId: number | undefined;
    private score: number;
    private comments: string;
    private restaurant: RestaurantEntity | undefined;

    constructor(score: number, comments: string, surveyId?: number){
        this.score = score;
        this.comments = comments;
        this.surveyId = surveyId;
    }

    getScore(): number {
        return this.score;
    }

    getComments(): string {
        return this.comments;
    }

    getRestaurant(): RestaurantEntity | undefined {
        return this.restaurant;
    }

    getSurveyId(): number | undefined{
        return this.surveyId;
    }

    setSurveyId(id: number): void{
        this.surveyId = id;
    }

    setScore(score: number): void{
        this.score = score;
    }

    setComments(comments: string): void{
        this.comments = comments;
    }

    setRestaurant(restaurant: RestaurantEntity): void{
        this.restaurant = restaurant;
    }
}