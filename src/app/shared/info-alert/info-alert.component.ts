import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-info-alert',
  templateUrl: './info-alert.component.html',
  styleUrls: ['./info-alert.component.css']
})
export class InfoAlertComponent {

  @Output() hidealert = new EventEmitter();
  @Input()
  showalert!:boolean;
  @Input()
  messagealert!:string;
  classalert:string="";

  getStyle(){
    return this.showalert ? 'display: ' : 'display: none';
    /*
    if(!this.showalert){
      return 'display: ';
    }else{
      return 'display: none';
    }*/
  }

  /*
  showAlert(message:string, type:string){
    this.messagealert = message;
    this.showalert = true;
    this.classalert = `alert alert-${type} alert-dismissible`;
    setTimeout(() => {  this.showalert = false; }, 2000);
  }*/
  hide(){
    this.hidealert.emit();
  }
}
