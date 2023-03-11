import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';

import{ Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  username:String='';

  serviceProviders: any; // serviceprovider means admin as he is providing service to members.
  loggeduser: any; // serviceprovider means admin as he is providing service to members.
  usersUrl:string='http://localhost:3000/users';// URL at postman from where all user are fetched
  originalserviceProvider:any;
  selectedService:any;

  constructor(
    private router:Router,
    private http:HttpClient,
    private _user:UserService,

  ) {
    this._user.user().subscribe(
      res=>{
        this.addName(res),
        console.log(res)
      },
      error=>{
        // this.router.navigate(['/login'])
        console.log(error)
      }
     )
  }

    addName(data:any){
      this.username = data.username;
      console.log(this.username);
    }
  
  ngOnInit(): void {
  //  to make sure only user can see this page by login so this is done 
    const user = localStorage.getItem('User')
    // this.addName(user);
    console.log(user); // here user info is being display after login successfull
    this.loggeduser=user;
    console.log(this.loggeduser);
    if(user==null){
      this.router.navigateByUrl('/login',{replaceUrl:true}) // here URL by replace so that user can not back and go to come again here without login
    }else{
      console.log(JSON.parse(user!)); // convert back user info into object so that we can use this info
      this.http.get(this.usersUrl).subscribe(res=>{
        console.log(res)
        this.serviceProviders=res;
        this.originalserviceProvider=res;
      },error=>{
        console.log(error)});
    }
      
    }
    // 
    
    logout(){
      this._user.logout()
      .subscribe(
        data=>{console.log(data);this.router.navigate(['/login'])},
        error=>console.error(error)
      )
    }
// onServiceSelected(e){
//   this.serviceProviders=this.originalserviceProvider;
//   this.selectedService=e.detail.value;
//   this.serviceProviders=this.serviceProviders.filter(serviceProve=>{
//     return serviceProve.service==this.selectedService
//   })
// }


  }


