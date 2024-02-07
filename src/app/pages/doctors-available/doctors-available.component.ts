import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IDcotor } from 'src/app/models/doctor.interface';
import { DoctorService } from 'src/app/services/doctor.service';
import { SharedServices } from 'src/app/services/shared.services';

@Component({
  selector: 'app-doctors-available',
  templateUrl: './doctors-available.component.html',
  styleUrls: ['./doctors-available.component.css']
})
export class DoctorsAvailableComponent {

  doctors: IDcotor[] = [];

  /**
   *
   */
  constructor(private _router: Router, 
    private doctorService: DoctorService,
    private _sharedService: SharedServices) {
    
    this.getDoctorsAvailable();
    
  }

  getDoctorsAvailable(){
    this.doctorService.getDoctorsAvailable().subscribe({
      next: (data: any) => {
        this.doctors = data;
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  chooseDoctor(doctor: IDcotor){
    this._sharedService.setDoctorSelected(doctor);
    this._router.navigate([`/pages/appointment-booking`, doctor.id]);
  }
   
  
}
