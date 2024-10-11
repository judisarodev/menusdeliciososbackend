import { DataTypes } from "sequelize";

export default class CategoryModel {
    static tableName: string = 'categories';
    static modelName: string = 'Category';
    static schema: any = {
        categoryId: {
            field: 'category_id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        icon: {
            type: DataTypes.STRING,
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