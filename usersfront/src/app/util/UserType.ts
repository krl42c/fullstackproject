export class UserType {
    readonly id : number;
    type : string;

    constructor(id : number, type : string) {
        this.id = id;
        this.type = type;
    }
}