import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Input, Output, EventEmitter } from '@angular/core';

import {MemberserviceService} from 'src/app/services/memberservice.service';
import { Member } from 'src/app/models/member.model';
import { AlertController, ModalController } from '@ionic/angular';
import { MemberDetailsPage } from '../member-details/member-details.page';

// import { ErrorStateMatcher } from '@angular/material/core';

// /** Error when invalid control is dirty, touched, or submitted. */
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

@Component({
  selector: 'app-member-add',
  templateUrl: './member-add.page.html',
  styleUrls: ['./member-add.page.scss'],
  providers:[MemberserviceService]
})
export class MemberAddPage implements OnInit {
  
  memberForm!: FormGroup;
    gym_id='';
    m_name='';
    Emergency_mobile='';
    mobile= '';
    aadhar='';
    email='';
    m_address_lat= '';
    m_address_long= '';
    memberType='';
    m_joindate='';
    m_accesstype='';
    isInviteAccepted=false;
  
    isLoadingResults = false;
    // matcher = new MyErrorStateMatcher();
  submitted = false;
  ngZone: any;
  MemberType: any = ['Member', 'Staff', 'Phyiotherepist', 'Utilities Staff', 'Manager'];
  AccessType: any = ['Paid', 'Free', 'Temp'];

  constructor(
    private router: Router,
    // public fb: FormBuilder,
    private formBuilder: FormBuilder,
    public memberApi:MemberserviceService,
    private cd: ChangeDetectorRef, 
    private alertCtrl: AlertController, 
    private modalCtrl: ModalController,
   
  ) { }

    ngOnInit() {
      // this.selectAccessType(this.AccessType);
      // this.selectMemberType(this.MemberType);
      console.log(localStorage.getItem('gymID'));
      
      this.memberForm = this.formBuilder.group({
        'gym_id' : [localStorage.getItem('gymID'), Validators.required],
        'm_name' : [null, Validators.required],
        'Emergency_mobile': [null, Validators.required],
        'mobile': [null, Validators.required],
        'aadhar':[null, Validators.required],
        'email':[null, Validators.required],
        'm_address_lat': [null, Validators.required],
        'm_address_long': [null, Validators.required],
        'memberType':[null, Validators.required],
        'm_joindate': [null, Validators.required],
        'm_accesstype':[null, Validators.required]
      });
        }

        // Choose options with select-dropdown
        selectMemberType(e) {
        this.memberForm.get('memberType').setValue(e, {
          onlySelf: true,
          })
        }

        selectAccessType(e) {
          this.memberForm.get('m_accesstype').setValue(e, {
            onlySelf: true,
            })
          }


        onFormSubmit() {
          this.isLoadingResults = true;
          this.memberApi.addMember(this.memberForm.value)
            .subscribe((res: any) => {
                const id = res._id;
                localStorage.setItem('ID',JSON.stringify(id));
                this.isLoadingResults = false;
                this.router.navigate(['/member/', id]);
              }, (err: any) => {
                console.log(err);
                this.isLoadingResults = false;
              });
        }


       
        
}
