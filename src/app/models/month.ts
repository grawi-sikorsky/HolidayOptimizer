import { Day } from './day';

export class Month {
    month:string = "";
    days:Day[] = [];

    constructor(month:string){ this.month = month }
}
