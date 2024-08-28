import { DataTypes, Sequelize } from 'sequelize';
import DataBaseEntity from './databaseEntity'; 

export default class SequelizeSetUp {
    dataBase: DataBaseEntity = {
        name: process.env.DATABASE_NAME || 'database',
        user: process.env.USER || 'root',
        password: process.env.PASSWORD || 'password',
        host: process.env.HOST || 'host',
    }
    sequelize: any;
    models: any = {};

    setUp(){
        this.sequelize = new Sequelize(this.dataBase.name, this.dataBase.user, this.dataBase.password, {
          host: this.dataBase.host,
          dialect: 'mysql', 
        });

        this.setUpModels();

        return this.models;
    }
    
    getSequelize(){
        return this.sequelize;
    }

    setUpModels(){
        const Product = this.sequelize.define(
            'Product',
            {
                productId: {
                    field: 'product_id',
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING,
                }
            },
            {
                sequelize: this.sequelize,
                timestamps: false,
                tableName: 'products'
            }
        );

        this.models = {
            Product,
            ...this.models,
        };
    }

}
