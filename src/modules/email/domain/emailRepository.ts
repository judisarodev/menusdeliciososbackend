export default interface EmailRepository {
    sendRecoverPasswordEmail(email: string, token: string): Promise<void>;
    sendVerifyEmail(email: string, token: string): Promise<void>;
}