import { DataTypes } from "sequelize";

export default class PaletteModel {
    static tableName: string = 'palettes';
    static modelName: string = 'Palette';

    static schema: any = {
        paletteId: {
            field: 'palette_id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
        },
        primaryColor: {
            field: 'primary_color',
            type: DataTypes.STRING,
            allowNull: false,
        },
        secondaryColor: {
            field: 'secondary_color',
            type: DataTypes.STRING,
            allowNull: false,
        },
        primaryTextColor: {
            field: 'primary_text_color',
            type: DataTypes.STRING,
            allowNull: false,
        },
        secondaryTextColor: {
            field: 'secondary_text_color',
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