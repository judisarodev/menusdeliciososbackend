import { DataTypes } from "sequelize";

export default class AddressModel {
    static tableName: string = 'addresses';
    static modelName: string = 'Address';
    static schema: any = {
        addressId: {
            field: 'address_id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        addressDetails: {
            field: 'address_details',
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