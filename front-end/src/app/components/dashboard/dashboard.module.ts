import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LayoutModule } from '@angular/cdk/layout';
import { TableComponent } from './table/table.component';
import { AppRoutingModule } from '../../app-routing.module';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateConfirmDialogComponent } from './create-confirm-dialog/create-confirm-dialog.component';
import { DeleteConfirmDialogComponent } from './delete-confirm-dialog/delete-confirm-dialog.component';
import { UpdateComponent } from './update/update.component';
import { CreateComponent } from './create/create.component';
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';



@NgModule({
  declarations: [
    HomeComponent,
    TableComponent,
    CreateConfirmDialogComponent,
    DeleteConfirmDialogComponent,
    UpdateComponent,
    CreateComponent,
    ProfileDialogComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    HomeComponent,
    TableComponent,
    CreateConfirmDialogComponent,
    DeleteConfirmDialogComponent,
    UpdateComponent,
    CreateComponent
  ]
})
export class DashboardModule { }
