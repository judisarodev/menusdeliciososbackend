import { CountryRepository } from "../domain/countryRepository";
import SequelizeSetUp from "../../../infraestructure/config/sequelize";
import CountryEntity from "../domain/countryEntity";

export default class CountryRepositoryImplementation implements CountryRepository{
    models: any = SequelizeSetUp.getModels();

    async getAll(): Promise<CountryEntity[]>{
        const countries = await this.models.Country.findAll();
        const countryEntities = countries.map((c: any) => {
            return new CountryEntity(c.name, c.phoneCode, c.countryId);
        });
        return countryEntities;
    }
}