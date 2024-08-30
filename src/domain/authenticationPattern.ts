export default interface AuthenticationPattern {
   signToken(restaurantId: number): Promise<string>;
   verifyToken(token: string): Promise<any>; 
}