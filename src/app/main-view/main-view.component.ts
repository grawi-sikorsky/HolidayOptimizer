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
  }
  ngOnChanges() {
    console.log("ng on changes main view");
    this.fillCalendar();
  }

  months:number[] = new Array(12);
  miesiaceCaptions = ["Styczeń", "Luty", "Marzec", "Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"];
  year:Year = new Year();
  daysInYear:number = 0;
  date = new Date();

  fillCalendar(){
    this.daysInYear = 0;
    this.year.months.splice(0);
    this.year.firstDayOfYear = new Date(this.year.year, 0, 1 );
    console.log("First day of year: " + this.year.firstDayOfYear);

    for(let i=0; i<this.months.length; i++){  // dla kazdego miesiaca
      this.year.months.push( new Month( (i+1).toString() ) ); // dodaj nowy miesiac
      let daysInMonth = new Date(this.year.year, i+1, 0).getDate();  // sprawdz ilosc dni danego miesiaca
      for(let j = 0; j<daysInMonth; j++){     // dodaj kazdy dzien dla danego miesiaca
        this.year.months[i].days.push ( new Day( (j+1).toString() ) ); // +1 bo dni nie zaczynaja sie od '0'
      }
      this.daysInYear += new Date(this.year.year, i, 0).getDate();
    }
    console.log("Days in year: " + this.daysInYear);
    console.log("DATA YEAR: ");
    console.log( this.year );

    this.findRuchomeSwieta();
  }

  findRuchomeSwieta(){
    return this.findWielkanoc();
  }
  findWielkanoc(){
    let a, b, c, d, e, f, g, h, i, k, l, m, p;
  
    // algorytm Meeusa/Jonesa/Butchera
    a = this.year.year % 19;
    b = Math.floor (this.year.year / 100);
    c = this.year.year % 100;
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
    
    let wielkanoc = day + "." + month + "." + this.year.year;

    this.year.months[month-1].days[day-1].isHoliday = true; // wielkanoc

    // PONIEDZIALEK WIELKANOCNY
    if( this.year.months[month-1].days.length === day ){
      this.year.months[month].days[0].isHoliday = true;   // poniedzielnik wielkanocny (wielkanoc +1) w kolejnym msc
    } else {
      this.year.months[month-1].days[day].isHoliday = true;   // poniedzielnik wielkanocny (wielkanoc +1) 
    }

    // ZIELONE SWIATKI (+49 dni od wielkanocy)
    let daysLeft = 60;
    let monthShift = -1;
    let mshift = day;

    while(daysLeft > 1){

      if(this.year.months[month+monthShift].days.length <= mshift){
        mshift = 0;
        monthShift++;
      }

      if(daysLeft === 12){ // po drodze wbijamy zielone swiatki (+49)
        this.year.months[month+monthShift].days[mshift].isHoliday = true;
      }

      daysLeft--;
      mshift++;
    }
    // na koncu bozie cialo (+60)
    this.year.months[month+monthShift].days[mshift].isHoliday = true;

    return wielkanoc;
  }


  prevYear(){
    let temp = this.year.year-1;
    this.year = new Year();
    this.year.year = temp;
    this.ngOnChanges();
  }
  nextYear(){
    let temp = this.year.year+1;
    this.year = new Year();
    this.year.year = temp;
    this.ngOnChanges();
  }
  isDaySelected(selected:Day){
    console.log(selected);
    this.year.months[Number(selected.month)].days[Number(selected.day)].isSelected = true;
    //this.ngOnChanges();
  }
  
} 
