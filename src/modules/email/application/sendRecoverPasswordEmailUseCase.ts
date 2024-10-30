import EmailRepositoryImplementation from "../infraestructure/emailRepositoryImplementation";

export default class SendRecoverPasswordEmailUseCase {
    constructor(private emailRepositoryImplementation: EmailRepositoryImplementation){}
    async execute(email: string){
        const token = '';
        this.emailRepositoryImplementation.sendRecoverPasswordEmail(email, token);
    }
}