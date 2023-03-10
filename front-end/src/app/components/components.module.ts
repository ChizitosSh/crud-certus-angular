import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { RoleDirective } from './role.directive';



@NgModule({
  declarations: [
    LoginComponent,
    RoleDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    LoginComponent,
    RoleDirective
  ]
})
export class ComponentsModule { }
