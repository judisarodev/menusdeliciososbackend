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
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        }, 
        password: {
            type: DataTypes.STRING,
        },
        logo: {
            type: DataTypes.STRING,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            field: 'phone_number',
            allowNull: false,
        },
        restaurantTypeId: {
            type: DataTypes.INTEGER,
            field: 'restaurant_type_id',
            allowNull: false,
        },
        countryId: {
            type: DataTypes.INTEGER,
            field: 'country_id',
            allowNull: false,
        },
        menuId: {
            type: DataTypes.INTEGER,
            field: 'menu_id',
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