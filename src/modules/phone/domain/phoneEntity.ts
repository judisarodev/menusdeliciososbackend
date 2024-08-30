import PhoneCodeEntity from "../../phone_code/phoneCodeEntity";

export default class PhoneEntity {
    private phoneId: number | undefined; 
    private phoneNumber: string;
    private phoneCode: PhoneCodeEntity;

    constructor(phoneNumber: string, phoneCode: PhoneCodeEntity, phoneId?: number){
        this.phoneNumber = phoneNumber;
        this.phoneCode = phoneCode;
        this.phoneId = phoneId; 
    }

    getPhoneId(): number | undefined {
        return this.phoneId;
    }

    getPhoneNumber(): string{
        return this.phoneNumber;
    }

    getPhoneCode(): PhoneCodeEntity {
        return this.phoneCode; 
    }

    setPhoneId(phoneId: number): void {
        this.phoneId = phoneId; 
    }
}