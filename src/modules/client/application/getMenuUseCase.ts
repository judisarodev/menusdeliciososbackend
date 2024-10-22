import ClientRepositoryImplementation from "../infraestructure/clientRepositoryImplementation";

export default class GetMenuUseCase {
    clientRepositoryImplementation: ClientRepositoryImplementation;

    constructor(clientRepositoryImplementation: ClientRepositoryImplementation){
        this.clientRepositoryImplementation = clientRepositoryImplementation;
    }

    async execute(url: string){
        return await this.clientRepositoryImplementation.getMenu(url);
    }
}