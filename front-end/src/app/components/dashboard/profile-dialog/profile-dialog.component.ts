import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Profile } from '../../../models/profile';
import { Users } from '../../../models/users';
import { UserServiceService } from '../../../services/user-service.service';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.css']
})
export class ProfileDialogComponent implements OnInit {

  constructor( private userService: UserServiceService, public dialogRef: MatDialogRef<ProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Users) {}

  ngOnInit(): void {
    this.getProfilePicture()
  }

  profilePictures: Profile[] = [];

  getProfilePicture() {
    this.userService.getProfilePicture().subscribe({
      next: (res: any) => {
        this.profilePictures = res.results;
      }
    })
  }

}
