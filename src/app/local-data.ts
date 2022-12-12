import { Day } from "./models/day";
import { Year } from './models/year';

export class LocalData {
    daysSelected:Day[] = [];
    
    //other stuff
    lastSelectedYear:number;

    vacationDays = new Map();
    vacationDaysUsed:number = 0;
    vacationDaysRemain:number = 0;

    constructor(){
        this.lastSelectedYear = new Date().getFullYear();
    }
}
