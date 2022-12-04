export class Day {
    day:string="";

    isDay:boolean = false;
    isSaturday:boolean = false;
    isSunday:boolean = false;
    isHoliday:boolean = false;

    month:string="";
    year:string="";
    fullDate:string="";

    constructor(day:string){ this.day = day }
}
