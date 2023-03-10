import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '../../material.module';
import { AppRoutingModule } from '../../app-routing.module';
import { RoleDirective } from '../role.directive';
import { ComponentsModule } from '../components.module';



@NgModule({
  declarations: [
    NotFoundComponent,
    NavComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    ComponentsModule
  ],
  exports: [
    NotFoundComponent,
    LayoutModule,
    NavComponent
  ]
})
export class SharedModule { }
