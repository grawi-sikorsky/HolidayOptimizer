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

  }

  setup(){

  }

  dniTygodnia = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"];

  date = new Date();
  day:number = this.date.getDate();
  month:number = this.date.getMonth();
  year:number = this.date.getFullYear();

  firstDayOfMonth = new Date(this.year, this.month, 1);
  daysInMonth = new Date(this.year, this.month+1, 0).getDate();


  
} 
