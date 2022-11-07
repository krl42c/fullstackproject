import { UserType } from "./UserType";

export class User {

    readonly id : number;
    name : string;
    last_name : string;
    email : string;
    user_type : UserType;

    constructor(id : number,name : string, last_name : string, email : string, user_type : UserType) {
        this.id = id;
        this.name = name;
        this.last_name = last_name;
        this.email = email;
        this.user_type = user_type;
    }

}