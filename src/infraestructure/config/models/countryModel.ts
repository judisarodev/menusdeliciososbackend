import { DataTypes } from "sequelize";

export default class CountryModel {
    static tableName: string = 'countries';
    static modelName: string = 'Country';

    static schema: any = {
        countryId: {
            field: 'country_id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneCode: {
            field: 'phone_code',
            type: DataTypes.STRING,
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