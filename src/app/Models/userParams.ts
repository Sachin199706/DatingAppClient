import { IUser } from "./User";

export class userParams{
    gender:string;
    minAge:number=18;
    maxAge:number=99;
    pageNumber:number=1;
    pageSize:number=5;
    OrderBy:string="lastActive";

    constructor(user:IUser | null){
        this.gender= user?.gender.toLowerCase()==='female' ? 'male' : 'female';
    }

}