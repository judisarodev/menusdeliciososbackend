import { Sequelize } from "sequelize";
import SequelizeSetUp from "./sequelize";

let sequelize: Sequelize | null = null;
let models: any = null;

export function getSequelizeInstance(){
    let sequelize = null;
    let models = null;

    if(sequelize === null || models === null){
        sequelize = new SequelizeSetUp();
        models = sequelize.setUp();
    }

    return {
        sequelize,
        models
    };
}