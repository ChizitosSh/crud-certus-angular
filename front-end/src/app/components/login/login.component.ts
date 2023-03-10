import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Users } from '../../models/users';
import { AuthenticationService } from '../../services/authentication.service';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;
  loading: boolean = false;

  // Reactive Form

  constructor( private formBuilder: FormBuilder, private authentication : AuthenticationService, private router: Router, private _snackBar: MatSnackBar, private userService: UserServiceService ) { }

  registerForm!: FormGroup;

  InitForm(): FormGroup {
      return this.formBuilder.group({
        email: ['', [Validators.required, Validators.pattern('^[aA-zZ0-9._%+-ñÑ]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        password: ['', [Validators.required]]
      })
  }

  get email() { return this.registerForm.get('email') };
  get password() { return this.registerForm.get('password') }

  redirect!: string;
  usersArray: Users[] = [];
  userValid: boolean = false;

  userId!: number;

  LogIn() {
    this.userService.loginUser(this.email?.value).subscribe(
      response => {
        if (response[0]['email'] === this.email?.value && response[0]['password'] === this.password?.value){
          this.Valid();
          this.userId = response[0]['id'];
          this.userService.changeUserId(this.userId) // Aquí debe cambiar el id del usuario
          console.log(this.userId)
        } else {
          this.Error()
        }
      }
    )
  }

  CorrectUser() {
    this.authentication.logIn();
    this.redirect = this.authentication.urlUsuarioIntentaAcceder; // Rute redireccionar
    this.authentication.urlUsuarioIntentaAcceder = '/home';
    this.router.navigate(['/home']);
  }

  // Button Error SnackBar 
  Error() {
    this._snackBar.open('El email o contraseña ingresados son inválidos', '', {
      duration: 3000,
    });
  }

  Valid() {
    this.loading = true;
    setTimeout(() => {
      this.CorrectUser();
    }, 1500);
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }

  // Comunicación con el nav

  ngOnInit(): void {
    this.registerForm = this.InitForm();
  }

  createAccount() {
    this.router.navigate(['/login/create'])
  }

}
