import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserServiceService } from '../../../services/user-service.service';
import { CreateConfirmDialogComponent } from '../create-confirm-dialog/create-confirm-dialog.component';
import { passwordMatch } from '../custom-validator/password-match';
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  titles = ['Mr', 'Mrs'];
  roles = ['admin', 'user'];
  hide: boolean = true; // Hide Password
  confirm_hide: boolean = true; // Hide Confirm Password
  loading: boolean = false; // Loading effect

  // Estructura del Reactive Form
  registroForm = this.formBuilder.group({
    id: [''],
    title: ['', [Validators.required]],
    name: ['', [ Validators.required, Validators.pattern('^([a-zA-Z-.]+(?: [a-zA-Z-.]+)?)$') ]],
    lastname: ['', [ Validators.required, Validators.pattern('^([a-zA-Z-.]+(?: [a-zA-Z-.]+)?)$') ]],
    email: ['', [ Validators.required, Validators.pattern('^[a-z0-9+_.-]+@certus.edu.pe$') ]],
    password: ['', [Validators.minLength(8)]],
    confirmPassword: [''],
    role: ['', [Validators.required]],
    image: [''],
  }, { validators: [passwordMatch('password', 'confirmPassword')]}); // Custom validator

  get id(){ return this.registroForm.get('id') };
  get title(){ return this.registroForm.get('title') };
  get name(){ return this.registroForm.get('name') };
  get lastname(){ return this.registroForm.get('lastname') };
  get email(){ return this.registroForm.get('email') };
  get password(){ return this.registroForm.get('password') };
  get confirmPassword(){ return this.registroForm.get('confirmPassword') };
  get role(){ return this.registroForm.get('role') };
  get image(){ return this.registroForm.get('image') };

  // Función para elegir una foto de perfil

  chooseProfilePicture(): void {
    const dialogRef = this.dialog.open(ProfileDialogComponent, {
      width: '400px',
      data: {name: this.name?.value, image: this.image?.value}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.registroForm.get('image')?.setValue(result);
    });
  }

  userId!: any;

  constructor( private formBuilder: FormBuilder , private _snackBar: MatSnackBar, public dialog: MatDialog, private userService: UserServiceService, private activatedRoute: ActivatedRoute, private router: Router ) {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.getUser(this.userId).subscribe(
      response => {
        this.registroForm.setValue({
          id: response[0]['id'],
          title: response[0]['title'],
          name: response[0]['name'],
          lastname: response[0]['lastname'],
          email: response[0]['email'],
          password: '',
          confirmPassword: '',
          role: response[0]['role'],
          image: response[0]['image']
        })
      }
    )
   }

  
  ngOnInit() {
  }

  // Envía la información a la base de datos
  onSubmit(){
    let registroFormNoPassword = {
      id: this.id?.value,
      title: this.title?.value,
      name: this.name?.value,
      lastname: this.lastname?.value,
      email: this.email?.value,
      password: '',
      role: this.role?.value,
      image: this.image?.value,
    }

    if (this.password?.value !== '') {
      this.userService.updateUser(this.registroForm.value).subscribe(() => {
      })
    } else {
      this.userId = this.activatedRoute.snapshot.paramMap.get('id');
      this.userService.getUser(this.userId).subscribe(
      response => { 
        registroFormNoPassword.password = response[0]['password'];
        this.userService.updateUser(registroFormNoPassword).subscribe(() => {
        })
      })

    }
  }

  listoParaEnviar: boolean = false;

  // _snackBar Position
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  SendForm(){
    if(!this.registroForm.valid && !this.listoParaEnviar){
      this._snackBar.open('Por favor, rellene todos los campos', 'Cerrar', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });

      return;
    } else {
      this.loading = true;
      setTimeout(() => {
        this._snackBar.open('El registro se ha actualizado con éxito', 'Cerrar', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });

        this.listoParaEnviar = true;
        this.router.navigate(['/table']);
      }, 1500);
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    }

  }

  // Función para autogenerar el email

  autogeneratedEmail!: any;

  AutogenerateEmail(name: any, lastname: any) {
    if(name == '' || lastname == '') {
        this._snackBar.open('Por favor, rellene todos los campos', 'Cerrar', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });

      return
    } else {
      let newName = name.toLowerCase().charAt(0);
      let newLastname = lastname.toLowerCase().split(' ');
      
      this.autogeneratedEmail = newName + newLastname[0] + '@certus.edu.pe';

      this.registroForm.get('email')?.setValue(this.autogeneratedEmail);

      return
    }

  }

  // Criterio para evitar que el usuario abandone el componente
  SalirDeRuta(): Observable<boolean> | boolean{  
      // Si el input se volvió dirty
      if( this.registroForm.dirty && !this.listoParaEnviar ){
        const dialogRef = this.dialog.open(CreateConfirmDialogComponent);
        return dialogRef.afterClosed();
      }

      return true;
  }

}