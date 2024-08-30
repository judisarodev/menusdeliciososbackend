export default interface AuthenticationPattern {
   signToken(): Promise<string>;
   verifyToken(token: string): Promise<boolean>; 
}