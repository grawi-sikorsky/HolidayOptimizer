import { Day } from './day';

export class Month {
    month:string = "";
    paddingDays:number = 0;
    days:Day[] = [];

    constructor(month:string){ this.month = month }
}
