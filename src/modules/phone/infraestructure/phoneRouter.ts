import { Router } from 'express';
import RouterPattern from "../../../domain/routerPattern";
import UpdatePhoneUseCase from '../application/updatePhoneUseCase';
import CreatePhoneUseCase from '../application/createPhoneUseCase';
import PhoneRepositoryImplementation from './phoneRepositoryImplementation';
import PhoneEntity from '../domain/phoneEntity';
import PhoneCodeEntity from '../../phone_code/phoneCodeEntity';

export default class PhoneRouter implements RouterPattern {
    router: Router;
    phoneRepositoryImplementation: PhoneRepositoryImplementation;
    
    updatePhoneUseCase: UpdatePhoneUseCase;
    createPhoneUseCase: CreatePhoneUseCase;
    constructor(){
        this.router = Router();
        this.phoneRepositoryImplementation = new PhoneRepositoryImplementation();
        this.updatePhoneUseCase = new UpdatePhoneUseCase(this.phoneRepositoryImplementation);
        this.createPhoneUseCase = new CreatePhoneUseCase(this.phoneRepositoryImplementation); 
        
        this.setUpRoutes();
    }

    setUpRoutes(): void {
        this.router.post('/create', async (req: any, res: any) => {
            try{
                const { phoneNumber, phoneCode } = req.body;
                const { code, country, phoneCodeId } = phoneCode;

                const phoneCodeEntity = new PhoneCodeEntity(code, country, phoneCodeId);
                const phoneEntity = new PhoneEntity(phoneNumber, phoneCodeEntity);
                await this.createPhoneUseCase.execute(phoneEntity);

                return res.status(200).json({ message: 'Teléfono creado exitosamente' });
            }catch(error){
                console.error(error);
                return res.status(500).json(error);
            }
        });

        this.router.patch('/update', async (req: any, res: any) => {
            try{
                const { phoneId, data } = req.body;
                const wasUpdated = await this.updatePhoneUseCase.execute(data, phoneId);
                return res.status(200).json({ success: wasUpdated }); 
            }catch(error){
                console.error(error);
                return res.status(500).json(error);
            }
        });
    }
    getRouter(): Router {
        return this.router;
    }
    
}