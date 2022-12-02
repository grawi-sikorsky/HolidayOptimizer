import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})

export class MainViewComponent implements OnInit{

  constructor() { }


  ngOnInit() {
    console.log(this.firstDayOfMonth);
    console.log(this.daysInMonth);
    console.log(this.dniTygodnia);
    this.setup();
  }

  setup(){


    let dateString = this.firstDayOfMonth.toLocaleDateString('pl-pl', {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
    let paddington = this.dniTygodnia.indexOf(dateString.split(', ')[0]);
    for (let i = 0; i<paddington; i++){

    }
    console.log(dateString);
    console.log(paddington);

    for(let i = 1; i<=this.daysInMonth; i++){
      this.daysInCal.push(i.toString());
    }
    if(paddington > 0){
      for (let j = 1; j<=paddington; j++){
        this.daysInCal.unshift("");
      }
    }
  }

  dniTygodnia = ["poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota", "niedziela"];

  date = new Date();
  day:number = this.date.getDate();
  month:number = this.date.getMonth();
  year:number = this.date.getFullYear();

  firstDayOfMonth = new Date(this.year, this.month, 1);
  daysInMonth = new Date(this.year, this.month+1, 0).getDate();

  daysInCal:string[] = [];
  
} 
