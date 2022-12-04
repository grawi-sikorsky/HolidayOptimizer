import { Month } from './month';

export class Year {
    year:string="";
    months:Month[] = [];
    firstDayOfYear:Date = new Date();
}
