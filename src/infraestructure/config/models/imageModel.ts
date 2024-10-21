import { DataTypes } from "sequelize";

export default class ImageModel {
    static tableName: string = 'images';
    static modelName: string = 'Image';

    static schema: any = {
        imageId: {
            field: 'image_id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        restaurantId: {
            field: 'restaurant_id',
            type: DataTypes.INTEGER
        },
        isBackground: {
            field: 'is_background',
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
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