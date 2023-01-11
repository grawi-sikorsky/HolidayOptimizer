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
  }

  ngOnChanges(){
    this.setup();
  }

  dniTygodnia = ["poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota", "niedziela"];
  dniTygodniaCaptions = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Nd"];

  monthDays:Day[] = [];

  setup(){
    this.monthDays.splice(0);
    this.monthDays = this.yearSelected.months[this.monthToDisplay].days;
    let firstDayOfMonth = new Date(this.yearSelected.year, this.monthToDisplay, 1);

    let dateString = firstDayOfMonth.toLocaleDateString('pl-pl', {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });

    let paddington = this.dniTygodnia.indexOf(dateString.split(', ')[0]);
    this.yearSelected.months[this.monthToDisplay].paddingDays = paddington;

    if(paddington > 0){
      for (let j = 1; j<=paddington; j++){
        this.monthDays.unshift( new Day("") );
      }
    }

    this.markWeekends();
  }

  markWeekends(){
    for(let k = 0; k < this.monthDays.length; k++){
      if ( k % 7 === 5 ) this.monthDays[k].isSaturday = true;
      if ( k % 7 === 6 ) this.monthDays[k].isSunday = true;
      this.monthDays[k].day === "" ? this.monthDays[k].isDay = false : this.monthDays[k].isDay = true;
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
}
