import { DataTypes } from "sequelize";

export default class SurveyModel {
    static tableName: string = 'surveys';
    static modelName: string = 'Survey';

    static schema: any = {
        surveyId: {
            field: 'survey_id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        comments: {
            type: DataTypes.STRING,
        },
        restaurantId: {
            field: 'restaurant_id',
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        time: {
            type: DataTypes.DATE,
        }
    };
    static options: any = {
        timestamps: false,
        tableName: this.tableName
    };

    static getModelSchema(): any{
        return this.schema; 
    }
    static getModelName(): string {
        return this.modelName;
    }
    static getModelOptions(sequelize: any): any{
        return {
            sequelize,
            ...this.options
        }
    }
}