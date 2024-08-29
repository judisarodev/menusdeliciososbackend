import { DataTypes } from "sequelize";

export default class RestaurantTypeModel {
    static tableName: string = 'restaurant_types';
    static modelName: string = 'RestaurantType';
    static schema: any = {
        restaurantTypeId: {
            field: 'restaurant_type_id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
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