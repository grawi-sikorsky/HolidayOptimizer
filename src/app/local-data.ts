import { Day } from "./models/day";

export class LocalData {
    daysSelected:Day[] = [];
    //other stuff
    lastYear:number;

    constructor(){
        this.lastYear = new Date().getFullYear();
    }
}
