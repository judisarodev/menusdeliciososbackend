import { DataTypes } from "sequelize";

export default class RestaurantModel {
    static tableName: string = 'restaurants';
    static modelName: string = 'Restaurant';
    static schema: any = {
        restaurantId: {
            field: 'restaurant_id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        password: {
            type: DataTypes.STRING,
        },
        logo: {
            type: DataTypes.STRING,
        },
        phoneId: {
            type: DataTypes.INTEGER,
            field: 'phone_id',
            allowNull: false,
        },
        addressId: {
            type: DataTypes.INTEGER,
            field: 'address_id',
            allowNull: false,
        },
        restaurantTypeId: {
            type: DataTypes.INTEGER,
            field: 'restaurant_type_id',
            allowNull: false,
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