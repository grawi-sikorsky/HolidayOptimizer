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
    this.loadLocalData();
    this.fillCalendar();
    this.loadSelectedDaysFromLocalData();
  }
  ngOnChanges() {
    
  }

  months:number[] = new Array(12); // fake array to iterate in html
  miesiaceCaptions = ["Styczeń", "Luty", "Marzec", "Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"];
  year:Year = new Year();
  persistentData:LocalData = new LocalData();

  fillCalendar(){
    this.year.months.splice(0); //clear data
    this.year.year = this.persistentData.lastSelectedYear;
    // this.year.firstDayOfYear = new Date(this.year.year, 0, 1 );
    // console.log("First day of year: " + this.year.firstDayOfYear);

    for(let i=0; i<this.months.length; i++){                            // dla kazdego miesiaca
      this.year.months.push( new Month( (i+1).toString() ) );           // dodaj nowy miesiac
      let daysInMonth = new Date(this.year.year, i+1, 0).getDate();     // sprawdz ilosc dni danego miesiaca
      for(let j = 0; j<daysInMonth; j++){                               // dodaj kazdy dzien dla danego miesiaca
        this.year.months[i].days.push ( new Day( (j+1).toString() ) );  // +1 bo dni nie zaczynaja sie od '0'
        this.year.months[i].days[j].month = (i+1).toString();           
        this.year.months[i].days[j].year = this.year.year.toString();
        this.year.months[i].days[j].fullDate = String( j+1+"."+(i+1)+"."+this.year.year );
      }
    }
    this.findHolidays();
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

  findHolidays(){
      this.year.months[0].days.find( e => { if(e.day==="1") e.isHoliday = true } );      // styczen: nowy rok
      this.year.months[0].days.find( e => { if(e.day==="6") e.isHoliday = true } );      // styczen: 'szesciu' kroli
      this.year.months[4].days.find( e => { if(e.day==="1") e.isHoliday = true } );      // maj: sw pracy
      this.year.months[4].days.find( e => { if(e.day==="3") e.isHoliday = true } );      // maj: konstytuszyn
      this.year.months[7].days.find( e => { if(e.day==="15") e.isHoliday = true } );     // sierpien: wniebowziecie
      this.year.months[10].days.find( e => { if(e.day==="1") e.isHoliday = true } );      // listopad: wszystkich swintych
      this.year.months[10].days.find( e => { if(e.day==="11") e.isHoliday = true } );     // listopad: niepodleglosc
      this.year.months[11].days.find( e => { if(e.day==="24") e.isHoliday = true } );     // grudzien: wigilia
      this.year.months[11].days.find( e => { if(e.day==="25") e.isHoliday = true } );     // grudzien: 1 day
      this.year.months[11].days.find( e => { if(e.day==="26") e.isHoliday = true } );     // grudzien: 2 day

      this.findRuchomeSwieta();
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

  selectDay(selected:Day){
    // 1. get month of selected day
    let selectedMonth = Number(this.year.months[Number(selected.month)-1].month)-1;

    // 2. set that day selected if it's not weekend or holiday
    this.year.months[selectedMonth].days.find( day => { 
      if( day.fullDate === selected.fullDate ){

        // not weekend, not some holiday, so can be selected:
        if( !day.isSelected && !day.isSaturday && !day.isSunday && !day.isHoliday ){
          day.isSelected = true;
          this.addVacationDay(selected);
        }
        // already selected -> deselect
        else if (day.isSelected === true){ 
          day.isSelected = false;
          this.removeVacationDay(selected);
        }
      }
    });

    this.saveLocal(this.persistentData);
  }

  addVacationDay(selected:Day){
    this.persistentData.daysSelected.push(selected);
  }

  removeVacationDay(selected:Day){
    let find = this.persistentData.daysSelected.find( f => { return f.fullDate == selected.fullDate } );
    this.persistentData.daysSelected.splice(this.persistentData.daysSelected.indexOf(find!),1);
  }

  loadSelectedDaysFromLocalData(){
    this.loadLocalData();

    this.persistentData.daysSelected.forEach( loadedDay => {
      let selectedMonth = Number(this.year.months[Number(loadedDay.month)-1].month)-1;

      this.year.months[selectedMonth].days.find( existingDay => { 
        if( existingDay.fullDate === loadedDay.fullDate ){
          existingDay.isSelected = true
        }
      });
    });

    

    this.calculateVacationDays();
  }
  
  calculateVacationDays(){
    this.persistentData.daysSelected.forEach( loadedDay => {
      if(loadedDay.year === this.persistentData.lastSelectedYear.toString()){
        this.year.vacationDaysUsed++;
      }
    })

    this.year.vacationDaysRemain = this.year.vacationDays - this.year.vacationDaysUsed;
    console.log(this.year.vacationDaysUsed);
  }

  deselectAll(){
  }

  onChange(){
    debugger;
    this.persistentData.vacationDays.set(this.year.year, this.year.vacationDays);
    this.saveLocal(this.persistentData);
  }

  saveLocal(data:LocalData){ //todo: savelocal bez parametru, wewnatrz poprzepisuje wszystko z klasy Year do persistenstorage.
    localStorage.setItem("localData", JSON.stringify(data));
  }

  loadLocalData(){
    if(localStorage.getItem("localData") !== null){
      this.persistentData = JSON.parse(localStorage.getItem("localData")!);

      //this.year.vacationDays = this.persistentData.vacationDays.get(this.year.year)!;
    }
  }
} 
