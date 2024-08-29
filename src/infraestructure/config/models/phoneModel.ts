import { DataTypes } from "sequelize";

export default class PhoneModel {
    static tableName: string = 'phones';
    static modelName: string = 'Phone';
    static schema: any = {
        phoneId: {
            field: 'phone_id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        phoneNumber: {
            field: 'phone_number',
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneCodeId: {
            field: 'phone_code_id',
            type: DataTypes.INTEGER,
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