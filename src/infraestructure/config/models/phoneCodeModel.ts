import { DataTypes } from "sequelize";

export default class PhoneCodeModel {
    static tableName: string = 'phone_codes';
    static modelName: string = 'PhoneCode';
    static schema: any = {
        phoneCodeId: {
            field: 'phone_code_id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
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