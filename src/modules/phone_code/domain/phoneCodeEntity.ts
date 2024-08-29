export default class PhoneCodeEntity { 
    private phoneCodeId: number | undefined;
    private code: string; 
    private country: string;

    constructor(code: string, country: string, phoneCodeId?: number){
        this.phoneCodeId = phoneCodeId;
        this.code = code;
        this.country = country; 
    }

    getPhoneCodeId(): number | undefined {
        return this.phoneCodeId;
    }

    getCode(): string {
        return this.code;
    }

    getCountry(): string {
        return this.country;
    }
}