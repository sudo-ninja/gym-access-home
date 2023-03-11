import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import {MemberserviceService} from 'src/app/services/memberservice.service';
import { Member } from 'src/app/models/member.model';

@Component({
  selector: 'app-member-update',
  templateUrl: './member-update.page.html',
  styleUrls: ['./member-update.page.scss'],
})
export class MemberUpdatePage implements OnInit {

  members: Member[] = [];

  member:Member={
    _id:'',
    m_name:'',
    gym_id:'',
    email: '',
    aadhar:'',
    mobile:'',
    Emergency_mobile:'',
    m_address_lat:'',
    m_address_long:'',
    memberType:'',
    m_joindate:'',
    m_accesstype:'',
    isInviteAccepted:false,
    }

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
  // submitted = false;
  // ngZone: any;
  id:any;
  idu:any;
  

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public memberApi:MemberserviceService,
  ) {
    
   }

  ngOnInit() {

    let idu = this.id || this.route.snapshot.params['id'];
    // this.getProduct(this.route.snapshot.params['id']);
    // this.getProduct(this.route.snapshot.paramMap.get('id'));
    this.getProduct(idu);
    localStorage.setItem('ID',this.idu);
    console.log(idu,this.id);
    console.log(this.route.snapshot.params['id']);
   
    this.memberForm = this.formBuilder.group({
      'gym_id' : ['', Validators.required],
      'm_name' : ['', Validators.required],
      'Emergency_mobile': ['', Validators.required],
      'mobile': ['', Validators.required],
      'aadhar':['', Validators.required],
      'email':['', Validators.required],
      'm_address_lat': ['', Validators.required],
      'm_address_long': ['', Validators.required],
      'memberType':['', Validators.required],
      'm_joindate': ['', Validators.required],
      'm_accesstype':['', Validators.required],
      'isInviteAccepted': false,
    });
  }

  async getProduct(id: any) {  
    this.memberApi.getMember(id).subscribe((data: any) => {
      this.id = data.id;
      this.memberForm.setValue({
        gym_id: data.gym_id,
        m_name: data.m_name,
        Emergency_mobile: data.Emergency_mobile,
        mobile: data.mobile,
        aadhar: data.aadhar,
        email: data.email,
        m_address_lat: data.m_address_lat,
        m_address_long: data.m_address_long,
        memberType: data.memberType,
        m_joindate: data.m_joindate,
        m_accesstype: data.m_accesstype,
        isInviteAccepted: false,
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    // const Id = localStorage.getItem('ID')    
    console.log(this.id,localStorage.getItem('ID'));

    let id = this.id||this.route.snapshot.paramMap.get('id');
    this.memberApi.update(id, this.memberForm.value)
      .subscribe((res: any) => {
        const id = res._id;
        // localStorage.setItem('ID', JSON.stringify(this.id));
        this.isLoadingResults = false;
        // console.log(this.id);
        this.router.navigate(['/member/',this.id]);
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      }
      );
  }

  productDetails() {
    
    this.router.navigate(['/member/',this.id]);
  }

}


