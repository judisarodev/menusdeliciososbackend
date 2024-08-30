import * as dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';
import ProductModel from './models/productModel';
import AddressModel from './models/addressModel';
import PhoneCodeModel from './models/phoneCodeModel';
import PhoneModel from './models/phoneModel';
import RestaurantTypeModel from './models/restaurantTypeModel';
import RestaurantModel from './models/restaurantModel';
import CategoryModel from './models/categoryModel';

export default class SequelizeSetUp {
    static dataBase: { name: string, user: string, password: string, host: string } = {
        name: process.env.DATABASE_NAME || 'database',
        user: process.env.USER || 'root',
        password: process.env.PASSWORD || 'password',
        host: process.env.HOST || 'host',
    }
    static models: any = {};
    static sequelize: any;
 
    static setUp(){
        this.sequelize = new Sequelize(this.dataBase.name, this.dataBase.user, this.dataBase.password, {
            host: this.dataBase.host,
            dialect: 'mysql', 
        });

        const models = this.setUpModels();
        this.setUpAssociations(models);

        this.models = models;
    }
    
    static getSequelize(){
        if(!this.sequelize){
            this.setUp();
        }
        return this.sequelize;
    }

    static getModels(){
        if(!this.sequelize){
            this.setUp();
        }

        return this.models;
    }

    static setUpModels(){

        const Address = this.sequelize.define(
            AddressModel.getModelName(),
            AddressModel.getModelSchema(),
            AddressModel.getModelOptions(this.sequelize)
        );

        const PhoneCode = this.sequelize.define(
            PhoneCodeModel.getModelName(),
            PhoneCodeModel.getModelSchema(),
            PhoneCodeModel.getModelOptions(this.sequelize)
        );

        const Phone = this.sequelize.define(
            PhoneModel.getModelName(),
            PhoneModel.getModelSchema(),
            PhoneModel.getModelOptions(this.sequelize)
        );

        const RestaurantType = this.sequelize.define(
            RestaurantTypeModel.getModelName(),
            RestaurantTypeModel.getModelSchema(),
            RestaurantTypeModel.getModelOptions(this.sequelize)
        );

        const Restaurant = this.sequelize.define(
            RestaurantModel.getModelName(),
            RestaurantModel.getModelSchema(),
            RestaurantModel.getModelOptions(this.sequelize)
        );

        const Category = this.sequelize.define(
            CategoryModel.getModelName(),
            CategoryModel.getModelSchema(),
            CategoryModel.getModelOptions(this.sequelize)
        );

        const Product = this.sequelize.define(
            ProductModel.getModelName(),
            ProductModel.getModelSchema(),
            ProductModel.getModelOptions(this.sequelize)
        );

        return {
            Product, 
            Address,
            PhoneCode,
            Phone,
            RestaurantType,
            Restaurant,
            Category
        };
    }

    static setUpAssociations(models: any): void {
        models.Phone.belongsTo(models.PhoneCode, {
            foreignKey: 'phoneCodeId',
            as: 'phoneCode'
        });

        models.Restaurant.belongsTo(models.Phone, {
            foreignKey: 'phoneId',
            as: 'phone'
        });

        models.Restaurant.belongsTo(models.Address, {
            foreignKey: 'addressId',
            as: 'address'
        });

        models.Restaurant.belongsTo(models.RestaurantType, {
            foreignKey: 'restaurantTypeId',
            as: 'restaurantType'
        });

        models.Category.belongsTo(models.Restaurant, {
            foreignKey: 'restaurantId',
            as: 'restaurant'
        });

        models.Product.belongsTo(models.Category, {
            foreignKey: 'categoryId',
            as: 'category'
        });

    }
}
