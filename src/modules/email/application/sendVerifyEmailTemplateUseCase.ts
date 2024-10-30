import EmailRepositoryImplementation from "../infraestructure/emailRepositoryImplementation";

export default class VerifyEmailUseCase {
    constructor(private emailRepositoryImplementation: EmailRepositoryImplementation){}
    async execute(email: string){
        const token = '';
        this.emailRepositoryImplementation.sendVerifyEmail(email, token);
    }
}