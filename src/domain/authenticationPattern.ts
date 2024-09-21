export default interface AuthenticationPattern {
   signToken(restaurantId: number): any;
   verifyToken(token: string): any; 
}