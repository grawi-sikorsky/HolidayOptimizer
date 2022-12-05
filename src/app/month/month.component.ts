import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Day } from '../models/day';
import { Year } from '../models/year';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {

  @Input() monthToDisplay = 0;
  @Input() yearSelected:Year = new Year();
  @Output() selectedDay = new EventEmitter();

  constructor(){  }

  ngOnInit() {
    // this.setup();
    // this.holidayAssign();
  }
  ngOnChanges(){
    this.setup();
    this.holidayAssign();
  }

  dniTygodnia = ["poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota", "niedziela"];
  dniTygodniaCaptions = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Nd"];

  days:Day[] = [];

  setup(){
    this.days.splice(0);
    this.days = this.yearSelected.months[this.monthToDisplay].days;
    let firstDayOfMonth = new Date(this.yearSelected.year, this.monthToDisplay, 1);
    let daysInMonth = new Date(this.yearSelected.year, this.monthToDisplay+1, 0).getDate();

    let dateString = firstDayOfMonth.toLocaleDateString('pl-pl', {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });

    let paddington = this.dniTygodnia.indexOf(dateString.split(', ')[0]);
    this.yearSelected.months[this.monthToDisplay].paddingDays = this.dniTygodnia.indexOf(dateString.split(', ')[0]);

    if(paddington > 0){
      for (let j = 1; j<=paddington; j++){
        this.days.unshift( new Day("") );
      }
    }

    for(let k = 0; k < this.days.length; k++){
      if ( k % 7 === 5 ) this.days[k].isSaturday = true;
      if ( k % 7 === 6 ) this.days[k].isSunday = true;
      this.days[k].day === "" ? this.days[k].isDay = false : this.days[k].isDay = true;
    }
  }

  isWeekend(day:Day){
    if( day.isSaturday || day.isSunday ){
      return true;
    }
    return false;
  }

  isHoliday(day:Day){
    if( day.isHoliday ){
      return true;
    }
    return false;
  }
  isSelected(day:Day){
    if(day.isSelected) return true;
    else return false;
  }

  holidayAssign(){
    //this.days.find( e => { if(e.isSelected) e.isHoliday = true } );
    
    if(this.monthToDisplay === 0){  // styczen
      this.days.find( e => { if(e.day==="1") e.isHoliday = true } );      // nowy rok
      this.days.find( e => { if(e.day==="6") e.isHoliday = true } );      // 'szesciu' kroli
    }
    else if(this.monthToDisplay === 1){ // luty
    }
    else if(this.monthToDisplay === 2){ // marzec
      //this.findWielkanoc()
    }
    else if(this.monthToDisplay === 3){ // kwiecien
      //this.findWielkanoc()
    }
    else if(this.monthToDisplay === 4){ // maj
      this.days.find( e => { if(e.day==="1") e.isHoliday = true } );      // sw pracy
      this.days.find( e => { if(e.day==="3") e.isHoliday = true } );      // konstytuszyn
    }
    else if(this.monthToDisplay === 5){ // czerwiec
    }
    else if(this.monthToDisplay === 6){ // lipiec
    }
    else if(this.monthToDisplay === 7){ // sierpien
      this.days.find( e => { if(e.day==="15") e.isHoliday = true } );      // wniebowziecie
    }
    else if(this.monthToDisplay === 8){ // wrzesien
    }
    else if(this.monthToDisplay === 9){ // pazdziernik
    }
    else if(this.monthToDisplay === 10){ // listopad
      this.days.find( e => { if(e.day==="1") e.isHoliday = true } );      // wszystkich swintych
      this.days.find( e => { if(e.day==="11") e.isHoliday = true } );     // niepodleglosc
    }
    else if(this.monthToDisplay === 11){ // grudzien
      this.days.find( e => { if(e.day==="24") e.isHoliday = true } );     // wigilia
      this.days.find( e => { if(e.day==="25") e.isHoliday = true } );     // 1 day
      this.days.find( e => { if(e.day==="26") e.isHoliday = true } );     // 2 day
    }
  }

}
