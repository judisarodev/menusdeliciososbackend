import EmailRepository from "../domain/emailRepository";

export default class EmailRepositoryImplementation implements EmailRepository {
    sendRecoverPasswordEmail(email: string, token: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    sendVerifyEmail(email: string, token: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}