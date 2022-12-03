import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})

export class MainViewComponent implements OnInit{
  
  
  constructor() { }

  ngOnInit() {
    this.setup();
  }

  months:number[] = new Array(12);

  dniTygodnia = ["poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota", "niedziela"];
  dniTygodniaCaptions = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Nd"];
  miesiaceCaptions = ["Styczeń", "Luty", "Marzec", "Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"];

  date = new Date();
  
  firstDayOfMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  daysInMonth = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDate();
  daysInCal:string[] = [];

  firstDayOfYear = new Date(this.date.getFullYear(), 0, 1);

  setup(){

    let dateString = this.firstDayOfMonth.toLocaleDateString('pl-pl', {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });

    let paddington = this.dniTygodnia.indexOf(dateString.split(', ')[0]);

    for(let i = 1; i<=this.daysInMonth; i++){
      this.daysInCal.push(i.toString());
    }
    if(paddington > 0){
      for (let j = 1; j<=paddington; j++){
        this.daysInCal.unshift("");
      }
    }
  }


  
} 
