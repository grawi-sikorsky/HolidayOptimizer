import { Component, Input, OnInit } from '@angular/core';
import { Day } from '../models/day';
import { Month } from '../models/month';
import { Year } from '../models/year';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})

export class MainViewComponent implements OnInit{
  
  
  constructor() { }

  ngOnInit() {
    this.fillCalendar();
    console.log("ROK JEST: " + this.pickedYear);
    console.log("Wielkanoc: " + this.findRuchomeSwieta());
    console.log("Wielkanoc: " + this.findRuchomeSwieta());
  }

  months:number[] = new Array(12);
  miesiaceCaptions = ["Styczeń", "Luty", "Marzec", "Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"];
  dniTygodnia = ["poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota", "niedziela"];
  year:Year = new Year();
  daysInYear:number = 0;
  calendarDays:Day[] = [];
  date = new Date();
  pickedYear:number = this.date.getUTCFullYear();
  daySelected : number = 0;


  fillCalendar(){
    this.year.firstDayOfYear = new Date(this.date.getFullYear(), 0, 1 );
    let firstDayOfYear = new Date(this.date.getFullYear(), 0, 1 );
    console.log("Firsrt day of year: " + firstDayOfYear);
    console.log("Firsrt day of year2: " + this.year.firstDayOfYear);

    for(let i=0; i<this.months.length; i++){
      this.year.months.push( new Month( (i+1).toString() ) );
      let temp = new Date(this.date.getFullYear(), i, 0).getDate();
      this.daysInYear += temp;
    }
    console.log("Days in year: " + this.daysInYear);

    console.log("DATA YEAR: " + this.year);
    // let firstDayOfMonth = new Date(this.date.getFullYear(), this.monthToDisplay, 1);
    // let daysInMonth = new Date(this.date.getFullYear(), this.monthToDisplay+1, 0).getDate();

    let dateString = firstDayOfYear.toLocaleDateString('pl-pl', {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });

    let paddington = this.dniTygodnia.indexOf(dateString.split(', ')[0]);
    console.log("Year Paddington: " + paddington);

    for(let i = 0; i<this.months.length; i++){
      let daysInMonth = new Date(this.date.getFullYear(), i+1, 0).getDate();
      for(let j = 0; j<daysInMonth; j++){
        this.calendarDays.push ( new Day( (j+1).toString() ) ); // +1 bo dni nie zaczynaja sie od '0'
      }
    }
    console.log(this.calendarDays);

    // if(paddington > 0){
    //   for (let j = 1; j<=paddington; j++){
    //     this.days.unshift( new Day("") );
    //   }
    // }

    // for(let k = 0; k < this.days.length; k++){
    //   if ( k % 7 === 5 ) this.days[k].isSaturday = true;
    //   if ( k % 7 === 6 ) this.days[k].isSunday = true;
    //   this.days[k].day === "" ? this.days[k].isDay = false : this.days[k].isDay = true;
    // }
  }

  findRuchomeSwieta(){
    this.findWielkanoc();
  }
  findWielkanoc(){
    let a, b, c, d, e, f, g, h, i, k, l, m, p;
     
    // algorytm Meeusa/Jonesa/Butchera
    a = this.pickedYear % 19;
    b = Math.floor (this.pickedYear / 100);
    c = this.pickedYear % 100;
    d = Math.floor (b / 4);
    e = b % 4;
    f = Math.floor  ((b + 8) / 25);
    g = Math.floor  ((b - f + 1) / 3);
    h = (19 * a + b - d - g + 15) % 30;
    i = Math.floor (c / 4);
    k = c % 4;
    l = (32 + 2 * e + 2 * i - h - k) % 7;
    m = Math.floor  ((a + 11 * h + 22 * l) / 451);
    p = (h + l - 7 * m + 114) % 31;
    
    let day = p + 1;
    let month = Math.floor ((h + l - 7 * m + 114) / 31);
    
    // dodawanie zer wiodących
    if(day < 10) day = 0 + day;
    if(month < 10) month = 0 + month;
    
    let wielkanoc = day + "." + month + "." + this.pickedYear;

    // if( this.monthToDisplay === month-1 )
    // {
    //   this.days.find( e => { if( e.day === day.toString() ) e.isHoliday = true } );           // Wielkanoc
    //   this.days.find( e => { if( e.day === (day+1).toString() ) e.isHoliday = true } );       // Poniedzialek Wielkanocny = wielkanoc + 1 // nie zadziala jesli wielkanoc = marzec, poniedzialek = kwiecien
    //   this.days.find( e => { if( e.day === (day+49).toString() ) e.isHoliday = true } );      // Poniedzialek Wielkanocny = wielkanoc + 49
    // }

    // pozostale swieta ruchome odnosza sie do wielkanocy, dlatego warto policzyc je w tym samym miejscu:
    // zielone swiatki

    // boze cielsko

    return wielkanoc;
  }
  findZieloneSwiatki(){

  }
  findBozeCielsko(){

  }
  
} 
