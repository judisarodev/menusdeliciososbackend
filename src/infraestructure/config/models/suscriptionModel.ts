import { DataTypes } from "sequelize";

export default class SuscriptionModel {
    static tableName: string = 'suscriptions';
    static modelName: string = 's0uscriptions';

    static schema: any = {
        suscriptionId: {
            field: 'suscription_id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
        },
        monts: {
            type: DataTypes.NUMBER,
        },
        startDate: {
            type: DataTypes.DATE,
            field: 'start_date',
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            field: 'end_date',
            allowNull: false,
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            field: 'is_active',
            allowNull: false,
        },
        restaurantId: {
            type: DataTypes.INTEGER,
            field: 'restaurant_id',
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