import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserServiceService } from '../../../services/user-service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor( private breakpointObserver: BreakpointObserver, public authentication: AuthenticationService, private userService: UserServiceService ) {}


  loggedUser: boolean = false;

  LogOut() {
    this.authentication.logOut();
  }

  // Comunicación entre login y nav
  userId!: any;
  username!: string;
  image!: string;
  role!: string;

  ngOnInit(): void {
    this.loggedUser = this.authentication.isLoggedIn('');
    this.authentication.changeLoginStatus$.subscribe(
      (loggedStatus: boolean) => this.loggedUser = loggedStatus
    );

    this.userService.currentUserId.subscribe(id => {
      if (id !== 0){
        this.userId = id;

        this.userService.getUser(this.userId).subscribe(
          response => {
            this.username = response[0]['name'];
            this.image = response[0]['image'];
            this.role = response[0]['role'];
        })
      } else {
        console.log('El id no se pudo recuperar')
      }
    });

  }


}