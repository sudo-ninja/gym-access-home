import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GymService } from './../../services/gym.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


// https://www.positronx.io/mean-stack-tutorial-angular-crud-bootstrap/

@Component({
  selector: 'app-gym-add',
  templateUrl: './gym-add.page.html',
  styleUrls: ['./gym-add.page.scss'],
})
export class GymAddPage implements OnInit {
  gymForm!: FormGroup;

  constructor(
    private router: Router,
    public fb: FormBuilder,
    private apiService: GymService
    
  ) { 
    this.mainForm();
  }

  ngOnInit() {
    
  }

  mainForm(){
    this.gymForm = this.fb.group({
      user_id: ['USER ID'],
      gym_name: [''],
      gym_emergency: [''],
      gym_mobile: [''],
      gym_gstin: [''],
      gym_lat: [''],
      gym_long: ['']
    })
  }

   // Getter to access form control
   get myForm() {
    return this.gymForm.controls;
  }


  onSubmit() {
    // this.submitted = true;
    if (!this.gymForm.valid) {
      return false;
    } else {
      return this.apiService.addGym(this.gymForm.value).subscribe((res: any) => {
        const id = res._id;
        // localStorage.setItem('ID',JSON.stringify(id));
        // this.isLoadingResults = false;
      localStorage.setItem('GYM',JSON.stringify(res)) // trick use to transfer added gym info gym list page

        this.router.navigate(['/gym-list']);
        },(err: any) => {
          console.log(err);
          // this.isLoadingResults = false;
        });
    }
  }
  // formSubmit() {

  //   if (!this.gymForm.valid){
  //     // return false;
  //   }else {
  //     // this.gymService.createBooking(this.gymForm.value).then(res => {
  //     //   console.log(res)
  //     //   this.gymForm.reset();
  //     //   this.router.navigate(['/gym-lst']);
  //     // }).catch(error => console.log(error));
  //   }

   
  // }

}
