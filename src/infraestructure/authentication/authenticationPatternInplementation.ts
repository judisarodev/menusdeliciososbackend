import * as dotenv from 'dotenv';
dotenv.config();
import AuthenticationPattern from "../../domain/authenticationPattern";
import jwt from "jsonwebtoken";



export default class AuthenticationPatternImplementation implements AuthenticationPattern {

    private SECRET: any = new TextEncoder().encode(process.env.SECRET); 

    signToken(restaurantId: number): any {
        const payload = {
            sub: restaurantId,
            expiresIn: '1h'
        }
        return jwt.sign(payload, this.SECRET);
    }

    verifyToken(token: string): any{
        return jwt.verify(token, this.SECRET);
    }

}