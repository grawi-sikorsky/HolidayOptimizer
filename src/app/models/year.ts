import { Month } from './month';

export class Year {
    year:number = 2022;
    months:Month[] = [];
    firstDayOfYear:Date = new Date();
}
