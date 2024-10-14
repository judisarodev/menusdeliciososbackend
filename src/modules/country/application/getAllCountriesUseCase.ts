import CountryRepositoryImplementation from "../infraestructure/countryRepositoryImplementation";

export default class GetAllCountries {
    countryRepositoryImplementation: CountryRepositoryImplementation;

    constructor(countryRepositoryImplementation: CountryRepositoryImplementation){
        this.countryRepositoryImplementation = countryRepositoryImplementation;
    }

    async execute(){
        return await this.countryRepositoryImplementation.getAll();
    }
}