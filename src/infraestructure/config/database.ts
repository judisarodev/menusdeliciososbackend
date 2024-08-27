import { Sequelize } from 'sequelize';
import DataBaseEntity from './databaseEntity'; 

export default class DataBaseSetUp {
    dataBase: DataBaseEntity = {
        name: process.env.DATABASE_NAME || 'database',
        user: process.env.USER || 'root',
        password: process.env.PASSWORD || 'password',
        host: process.env.HOST || 'host',
    }
    sequelize: any;
    
    setUp(){
        this.sequelize = new Sequelize(this.dataBase.name, this.dataBase.user, this.dataBase.password, {
          host: this.dataBase.host,
          dialect: 'mysql', 
        });
    }
    
    getSequelize(){
        return this.sequelize;
    }
}
