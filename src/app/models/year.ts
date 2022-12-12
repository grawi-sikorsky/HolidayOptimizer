import { Day } from './day';
import { Month } from './month';

export class Year {
    year:number = 2022;
    months:Month[] = [];

    vacationDays:number = 0;
    vacationDaysUsed:number = 0;
    vacationDaysRemain:number = 0;

}
