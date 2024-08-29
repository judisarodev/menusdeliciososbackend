import { DataTypes } from 'sequelize';

export default class ProductModel {
    static modelName: string = 'Product'; 

    static table: string = 'products';

    static schema: any = {
        productId: {
            field: 'product_id',
            primaryKey: true,
            type: DataTypes.NUMBER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            field: 'category_id',
            allowNull: false,
        }
    };

    static options: any = {
        timestamps: false,
        tableName: this.table,
    };

    static getModelSchema(): any {
        return this.schema;
    }

    static getModelOptions(sequelize: any): any{
        return {
            sequelize,
            ...this.options,
        }
    }

    static getModelName(): string{
        return this.modelName; 
    }
}