import SurveyEntity from "./surveyEntity";

export interface SurveyRepository{
    getAll(page: number, rows: number, restaurantId: number): Promise<{ surveys: SurveyEntity[], totalRecords: number }>;
}