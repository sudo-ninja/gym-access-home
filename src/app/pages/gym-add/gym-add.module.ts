import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GymAddPageRoutingModule } from './gym-add-routing.module';

import { GymAddPage } from './gym-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    GymAddPageRoutingModule
  ],
  declarations: [GymAddPage]
})
export class GymAddPageModule {}
