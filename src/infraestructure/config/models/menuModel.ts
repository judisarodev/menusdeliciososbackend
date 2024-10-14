import { DataTypes } from "sequelize";

export default class MenuModel {
    static tableName: string = 'menus';
    static modelName: string = 'Menu';

    static schema: any = {
        menuId: {
            field: 'survey_id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
        },
        showDescription: {
            field: 'show_description',
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        showImge: {
            field: 'show_image',
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        showNavigation: {
            field: 'show_navigation',
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        showIcons: {
            field: 'show_icons',
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        layout: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        font: {
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