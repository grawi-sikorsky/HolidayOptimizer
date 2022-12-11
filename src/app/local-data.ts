import { Day } from "./models/day";

export class LocalData {
    daysSelected:Day[] = [];
    
    //other stuff
    lastSelectedYear:number;

    userFreeVacationDays:number = 0;
    userUsedVacationDays:number = 0;
    userRemainVacationDays:number = 0;

    constructor(){
        this.lastSelectedYear = new Date().getFullYear();
    }
}
