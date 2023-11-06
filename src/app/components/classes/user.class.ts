export class User {
    public id?: number;
    public firstName!: string;
    public infix?: string;
    public lastName!: string;
    public postalCode!: string;
    public houseNumber!: number;
    public addition?: string;
    public city!: string;
    public streetName!: string;

    constructor(obj: any) {
        this.id = obj.id;
        this.firstName = obj.firstName;
        this.infix = obj.infix;
        this.lastName = obj.lastName;
        this.postalCode = obj.postalCode;
        this.houseNumber = obj.houseNumber;
        this.addition = obj.addition;
        this.city = obj.city;
        this.streetName = obj.streetName;
    }

    get fullName(): string {
        if(this.infix) {
            return this.firstName + " " +  this.infix +  " " + this.lastName;
        } else {
            return this.firstName + " " + this.lastName;
        }
    }

    get fullAddress(): string {
        if(this.addition) {
            return this.streetName + " " + this.houseNumber + " " + this.addition;
        } else {
            return this.streetName + " " + this.houseNumber
        }
    }

    get postalCodeCity(): string {
        return this.postalCode + " " + this.city;
    }
}