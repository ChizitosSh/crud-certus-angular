import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/dashboard/create/create.component';
import { HomeComponent } from './components/dashboard/home/home.component';
import { TableComponent } from './components/dashboard/table/table.component';
import { UpdateComponent } from './components/dashboard/update/update.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { ActivateGuard } from './guards/activate.guard';
import { DeactivateGuard } from './guards/deactivate.guard';
import { RolesGuard } from './guards/roles.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [ActivateGuard]  },
  { path: 'table', component: TableComponent, data: { role: 'admin'}, canActivate: [ActivateGuard, RolesGuard]  },
  { path: 'create', component: CreateComponent, data: { role: 'admin'}, canActivate: [ActivateGuard, RolesGuard], canDeactivate: [DeactivateGuard] },
  { path: 'update/:id', component: UpdateComponent, canActivate: [ActivateGuard], canDeactivate: [DeactivateGuard] },
  // { path: 'dashboard', component: DashboardComponent, canActivate: [ActivateGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'login/create', component: CreateComponent, canDeactivate: [DeactivateGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
