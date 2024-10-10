export default class CountryEntity{
    private countryId: number | undefined;
    private name: string;
    private phoneCode: string;

    constructor(name: string, phoneCode: string, countryId?: number){
        this.name = name;
        this.phoneCode = phoneCode;
        this.countryId = countryId;
    }

    getCountryId(): number | undefined {
        return this.countryId;
    }

    getName(): string {
        return this.name;
    }

    getPhoneCode(): string {
        return this.phoneCode;
    }

    setCountryId(countryId: number): void {
        this.countryId = countryId;
    }

    setName(name: string): void {
        this.name = name;
    }

    setPhoneCode(phoneCode: string){
        this.phoneCode = phoneCode;
    }
}