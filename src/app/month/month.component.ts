import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {

  @Input() monthToDisplay = 0;
  
  constructor(){ }

  ngOnInit() {
    console.log("month component: ")
    this.setup();
    this.isWeekend();
  }

  dniTygodnia = ["poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota", "niedziela"];
  dniTygodniaCaptions = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Nd"];

  date = new Date();
  daysInCal:string[] = [];

  setup(){

    let firstDayOfMonth = new Date(this.date.getFullYear(), this.monthToDisplay, 1);
    let daysInMonth = new Date(this.date.getFullYear(), this.monthToDisplay+1, 0).getDate();

    let firstDayOfYear = new Date(this.date.getFullYear(), 0, 1);

    let dateString = firstDayOfMonth.toLocaleDateString('pl-pl', {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });

    let paddington = this.dniTygodnia.indexOf(dateString.split(', ')[0]);

    console.log("dateString: " + dateString);
    console.log("Paddington: " + paddington);

    for(let i = 1; i<=daysInMonth; i++){
      this.daysInCal.push(i.toString());
    }
    if(paddington > 0){
      for (let j = 1; j<=paddington; j++){
        this.daysInCal.unshift("");
      }
    }
  }

  isWeekend(){
    if(this.monthToDisplay === 0){
      console.log("nowy rok");
      return true;
    }
    return false;
  }

  isHoliday(){

  }

}
