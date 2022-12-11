import { Component, Input, OnInit } from '@angular/core';
import { Day } from '../models/day';
import { Month } from '../models/month';
import { Year } from '../models/year';
import { LocalData } from '../local-data';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})

export class MainViewComponent implements OnInit{
  
  constructor() { }

  ngOnInit() {
    this.loadLocal();
    this.fillCalendar();
    this.loadSelectedFromLocalData();
  }
  ngOnChanges() {
  }

  months:number[] = new Array(12); // fake array to iterate in html
  miesiaceCaptions = ["Styczeń", "Luty", "Marzec", "Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"];
  year:Year = new Year();
  persistentData:LocalData = new LocalData();

  fillCalendar(){
    this.year.months.splice(0);
    this.year.year = this.persistentData.lastSelectedYear;
    this.year.firstDayOfYear = new Date(this.year.year, 0, 1 );
    console.log("First day of year: " + this.year.firstDayOfYear);

    for(let i=0; i<this.months.length; i++){  // dla kazdego miesiaca
      this.year.months.push( new Month( (i+1).toString() ) ); // dodaj nowy miesiac
      let daysInMonth = new Date(this.year.year, i+1, 0).getDate();  // sprawdz ilosc dni danego miesiaca
      for(let j = 0; j<daysInMonth; j++){     // dodaj kazdy dzien dla danego miesiaca
        this.year.months[i].days.push ( new Day( (j+1).toString() ) ); // +1 bo dni nie zaczynaja sie od '0'
        this.year.months[i].days[j].month = (i+1).toString();
        this.year.months[i].days[j].year = this.year.year.toString();
        this.year.months[i].days[j].fullDate = String( j+1+"."+(i+1)+"."+this.year.year );
      }
    }
    this.findRuchomeSwieta();
  }

  updateCallendar(){
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
    this.persistentData.lastSelectedYear = temp;
    this.saveLocal(this.persistentData);
    this.ngOnInit();
  }
  nextYear(){
    let temp = this.year.year+1;
    this.year = new Year();
    this.year.year = temp;
    this.persistentData.lastSelectedYear = temp;
    this.saveLocal(this.persistentData);
    this.ngOnInit();
  }

  isDaySelected(selected:Day){
    // 1. get month of selected day
    let selectedMonth = Number(this.year.months[Number(selected.month)-1].month)-1;

    this.year.months[selectedMonth].days.find( e => { 
      if( e.fullDate===selected.fullDate ){
        if( e.isSelected === false && e.isSaturday === false && e.isSunday === false ) e.isSelected = true
        else e.isSelected = false;
      }
    });

    let find = this.persistentData.daysSelected.find( f => { return f.fullDate == selected.fullDate } );

    if( find === undefined ){
      this.persistentData.daysSelected.push(selected);
      this.persistentData.userRemainVacationDays--;
      this.persistentData.userUsedVacationDays++;
    } else {
      console.log(selected.fullDate + " element exists. Deleting...");
      console.log(this.persistentData.daysSelected.indexOf(find));
      this.persistentData.daysSelected.splice(this.persistentData.daysSelected.indexOf(find),1);
      this.persistentData.userRemainVacationDays++;
      this.persistentData.userUsedVacationDays--;
    }
    this.saveLocal(this.persistentData);
  }

  loadSelectedFromLocalData(){
    this.loadLocal();
    this.persistentData.daysSelected.forEach( loadedDay => {

      let selectedMonth = Number(this.year.months[Number(loadedDay.month)-1].month)-1;

      this.year.months[selectedMonth].days.find( existingDay => { 
        if( existingDay.fullDate===loadedDay.fullDate ){
          existingDay.isSelected = true
        }
      });
    });
  }
  
  deselectAll(){

  }

  saveLocal(data:LocalData){ //todo: savelocal bez parametru, wewnatrz poprzepisuje wszystko z klasy Year do persistenstorage.
    localStorage.setItem("localData", JSON.stringify(data));
  }

  loadLocal(){
    if(localStorage.getItem("localData") !== null){
      this.persistentData = JSON.parse(localStorage.getItem("localData")!);
    }
  }
} 
