import * as dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';
import ProductModel from './models/productModel';
import AddressModel from './models/addressModel';
import RestaurantTypeModel from './models/restaurantTypeModel';
import RestaurantModel from './models/restaurantModel';
import CategoryModel from './models/categoryModel';
import SuscriptionModel from './models/suscriptionModel';
import PaletteModel from './models/paletteModel';
import MenuModel from './models/menuModel';
import CountryModel from './models/countryModel';
import SurveyModel from './models/surveyModel';

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

        const Suscription = this.sequelize.define(
            SuscriptionModel.getModelName(),
            SuscriptionModel.getModelSchema(),
            SuscriptionModel.getModelOptions(this.sequelize)
        );

        const Palette = this.sequelize.define(
            PaletteModel.getModelName(),
            PaletteModel.getModelSchema(),
            PaletteModel.getModelOptions(this.sequelize)
        );

        const Menu = this.sequelize.define(
            MenuModel.getModelName(),
            MenuModel.getModelSchema(),
            MenuModel.getModelOptions(this.sequelize)
        );

        const Survey = this.sequelize.define(
            SurveyModel.getModelName(),
            SurveyModel.getModelSchema(),
            SurveyModel.getModelOptions(this.sequelize)
        );

        const Country = this.sequelize.define(
            CountryModel.getModelName(),
            CountryModel.getModelSchema(),
            CountryModel.getModelOptions(this.sequelize)
        );

        const Address = this.sequelize.define(
            AddressModel.getModelName(),
            AddressModel.getModelSchema(),
            AddressModel.getModelOptions(this.sequelize)
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
            RestaurantType,
            Restaurant,
            Category,
            Suscription,
            Survey,
            Menu,
            Palette,
            Country
        };
    }

    static setUpAssociations(models: any): void {
        models.Restaurant.belongsTo(models.RestaurantType, {
            foreignKey: 'restaurantTypeId',
            as: 'restaurantType'
        });

        models.Restaurant.belongsTo(models.Country, {
            foreignKey: 'countryId',
            as: 'country'
        });

        models.Suscription.belongsTo(models.Restaurant, {
            foreignKey: 'restaurantId',
            as: 'restaurant'
        });
        
        models.Survey.belongsTo(models.Restaurant, {
            foreignKey: 'restaurant_id',
            as: 'restaurant'
        });

        models.Restaurant.belongsTo(models.Menu, {
            foreignKey: 'menu_id',
            as: 'menu'
        });

        models.Menu.belongsTo(models.Palette, {
            foreignKey: 'palette_id',
            as: 'palette'
        });
        
        models.Address.belongsTo(models.Restaurant, {
            foreignKey: 'restaurantId',
            as: 'restaurant'
        });

        models.Product.belongsTo(models.Category, {
            foreignKey: 'categoryId',
            as: 'category'
        });

        models.Category.belongsTo(models.Menu, {
            foreignKey: 'menu_id',
            as: 'menu'
        });


    }
}
