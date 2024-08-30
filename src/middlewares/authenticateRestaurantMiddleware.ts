import AuthenticationPatternImplementation from '../infraestructure/authentication/authenticationPatternInplementation';

const authenticationPatternImplementation = new AuthenticationPatternImplementation();

const authenticateRestaurant = async (req: any, res: any, next: any) => {
    try {
        const authorizationHeader = req.headers['authorization'];
        const token = authorizationHeader && authorizationHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Petición sin token de verificación' });
        }
        const payload = await authenticationPatternImplementation.verifyToken(token);
        if(!payload || !payload.restaurantId){
            return res.status(401).json({ message: 'Payload requerido no fue proporcionado' });
        }
        req.restaurantId = payload.restaurantId;
        next();
    }catch(error){
        console.error(error);
        return res.status(401).json({ message: 'Error en la verificación', isVerified: false });
    }
}

export default authenticateRestaurant;