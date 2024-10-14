import { DataTypes } from "sequelize";

export default class MenuModel {
    static tableName: string = 'menus';
    static modelName: string = 'Menu';

    static schema: any = {
        menuId: {
            field: 'menu_id',
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
        showImages: {
            field: 'show_images',
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
        paletteId: {
            field: 'palette_id',
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