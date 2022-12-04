import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})

export class MainViewComponent implements OnInit{
  
  
  constructor() { }

  ngOnInit() {
    console.log("ROK JEST: " + this.pickedYear);
    console.log("Wielkanoc: " + this.findRuchomeSwieta());
    console.log("Wielkanoc: " + this.findRuchomeSwieta());
  }

  months:number[] = new Array(12);
  miesiaceCaptions = ["Styczeń", "Luty", "Marzec", "Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"];
  date = new Date();
  daySelected : number = 0;
  pickedYear:number = this.date.getUTCFullYear();

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
