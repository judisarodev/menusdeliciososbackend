export default interface AuthenticationPattern {
   signToken(): Promise<string>;
   verifyToekn(token: string): boolean; 
}