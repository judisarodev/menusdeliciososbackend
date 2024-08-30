import * as dotenv from 'dotenv';
dotenv.config();
import AuthenticationPattern from "../../domain/authenticationPattern";
import * as jose from 'jose'

export default class AuthenticationPatternImplementation implements AuthenticationPattern {

    private secret: any = new TextEncoder().encode(process.env.SECRET || 'secret'); 
    private algorithm: string = 'HS256'; 

    async signToken(): Promise<string> {
        const jwt = await new jose.SignJWT({ 'urn:example:claim': true })
            .setProtectedHeader({ alg: this.algorithm })
            .setIssuedAt()
            .setIssuer('urn:example:issuer')
            .setAudience('urn:example:audience')
            .setExpirationTime('2h')
            .sign(this.secret);

        console.log('Secret', process.env.SECRET);
        return jwt;
    }

    verifyToekn(token: string): boolean {
        throw new Error("Method not implemented.");
    }

}