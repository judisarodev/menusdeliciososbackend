import CountryEntity from "./countryEntity";

export interface CountryRepository{
    getAll(): Promise<CountryEntity[]>;
}