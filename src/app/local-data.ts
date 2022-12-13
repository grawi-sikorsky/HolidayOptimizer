import { Day } from './models/day';

export class LocalData {
    daysSelected:Day[] = [];
    
    //other stuff
    lastSelectedYear:number;

    vacationDays:Map<number, number>;
    vacationDaysUsed:number = 0;
    vacationDaysRemain:number = 0;

    constructor(){
        this.lastSelectedYear = new Date().getFullYear();
        this.vacationDays = new Map<number, number>();
    }
}
