import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedServices } from 'src/app/services/shared.services';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  items = [
    {nameDay: '', numberDay: 0, monthName: '', year: 0, fullDate: new Date(), active: ''},
  ]

  @Output() selectDate = new EventEmitter<Date>();
  
  constructor(private _sharedServices: SharedServices) {
  }

  previousEnabledDisabled(){

    if(this.items.length === 0) return 'disabled';

    if(this.items[0].fullDate.getDate() === new Date().getDate()){
      return 'disabled';
    }
    return '';
  }

  ngOnInit() {
    const startDate = new Date();
    this.items = this.calculateItems(startDate);
    this.items[0].active = 'active';
  }

  calculateItems(startDate: Date) {
    const items = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      items.push(this.newItem(date));
    }
    return items;
  }

  newItem(date: Date) {
    return {
      nameDay: this.getNameDay(date.getDay()),
      numberDay: date.getDate(),
      monthName: this.getMonthName(date.getMonth()),
      year: date.getFullYear(),
      fullDate: date,
      active: ''
    }
  }

  getNameDay(day: number) {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[day];
  }

  getMonthName(month: number) {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return months[month];
  }

  chooseDate(item:any) {
    this.items.forEach(i => {
      if (i.fullDate === item.fullDate) {
        i.active = 'active';
      } else
        i.active = '';
    });
    
    this.selectDate.emit(item.fullDate);
  }
  nextDate() {
    let cantElements = this.items.length;
    const startDate = new Date(this.items[cantElements - 1].fullDate);
    startDate.setDate(startDate.getDate() + 1);
    this.items.splice(0, 1);
    this.items.push(this.newItem(startDate));
  }

  previousDate() {
    let cantElements = this.items.length;
    if (cantElements === 0) return;
    const startDate = new Date(this.items[0].fullDate);
    startDate.setDate(startDate.getDate() - 1);
    this.items.pop();
    this.items.unshift(this.newItem(startDate));
  }
}
