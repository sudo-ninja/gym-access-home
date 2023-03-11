import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Share } from '@capacitor/share';
import { AlertController, GestureController, LoadingController, ModalController } from '@ionic/angular';
import { Member } from 'src/app/models/member.model';

import {MemberserviceService}  from 'src/app/services/memberservice.service';
import { MemberUpdatePage } from '../member-update/member-update.page';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.page.html',
  styleUrls: ['./member-list.page.scss'],
})
export class MemberListPage implements OnInit {
  // @ViewChildren(IonCard,{read:ElementRef})

  members: Member[] = [];
  _id :string; // This is an observable

  constructor(
    private gestureCtrl: GestureController,
    public loadingController:LoadingController,
    public router :Router,
    public route :ActivatedRoute,
    public memberApi:MemberserviceService,
    private cd: ChangeDetectorRef, 
    private alertCtrl: AlertController, 
    private modalCtrl: ModalController,

  ) { 
    
  }

  ngOnInit() {
    this.getMembers();
    
  }


async getMembers(){
  const loading = await this.loadingController.create({
    message: 'Loading....'
  });
  await loading.present();
  await this.memberApi.getAll()
  .subscribe(res=>{
    this.members=res;
    console.log(this.members);
    localStorage.setItem('thisMember',JSON.stringify(res));
    loading.dismiss();
  }),err=>{
    console.log(err);
    loading.dismiss();
    }
  }

  // drop(event:CdkDragDrop<string[]>){
  //   moveItemInArray(this.members,event.previousIndex,event.currentIndex);
  // }

  addProduct() {
    this.router.navigate(['/member-add']);
  }

  async updateMember(uid:string) {
      const modal = await this.modalCtrl.create({
      component: MemberUpdatePage,
      componentProps:{id:uid},
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.8,
      
    });
    console.log(res => {
      this.memberApi.getMember(res.id);});
    await modal.present();
  }
  

  async basicShare(){
    await Share.share({
      title:' This will appear in subject  ',
      text:' this will appear in message body',
      url:'url link from here '
    });
  }

 

  onTap(event: any) {
    console.log('tap: ', event);
  }

  onDoubleTap(event: any) {
    console.log('double tap: ', event);
  }

  onPress(event: any) {
    console.log('press: ', event);
  }

  onSwipe(event: any) {
    console.log(event);
  }
  

}
