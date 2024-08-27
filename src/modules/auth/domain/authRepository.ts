import AuthEntity from "./authEntity";

export default interface AuthRepository {
    login(auth: AuthEntity): { success: boolean, token: string };
}