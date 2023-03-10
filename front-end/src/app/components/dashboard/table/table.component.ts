import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Users } from '../../../models/users';
import { UserServiceService } from '../../../services/user-service.service';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  // Paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // // Crear instancia de UserServices
  constructor( private userService: UserServiceService, public dialog: MatDialog, private _snackBar: MatSnackBar ) { }

  // // Ejecutar el método getAll del servicio al cargar el componente

  usersArray: Users[] = []; // Dentro del array irá la data de la API
  displayedColumns: string[] = ['id', 'name', 'lastname', 'email', 'role', 'acciones', 'seleccionar'];
  dataSource!: MatTableDataSource<Users>;

  ngOnInit() {
    this.getUsersService();
  }

  getUsersService() {
    // Ejecutar el método getAllInterceptor
    this.userService.getUsers().subscribe({
      // next dice que hacer cuando se ejecutar el método
      next: (user: Users[]) => { 
        this.usersArray = user; 
        this.dataSource = new MatTableDataSource(this.usersArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      // error y complete no son necesarios
      error: (e) => console.error(e),
      complete: () => console.info('La API funcionó con éxito')
    })
  }

  // Filter Users By Table Header
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  // Delete User
  deleteUser(userId: string, userName: string) {
    this.dialog.open(DeleteConfirmDialogComponent, {
        data: `¿Realmente quieres eliminar a ${userName}?`
      }).afterClosed().subscribe((confirmado: Boolean) => {
        if (!confirmado) return;
        this.userService
          .deleteUser(userId)
          .subscribe({
            next: () => {
              console.log('Registro eliminado'), 
              this._snackBar.open('Usuario eliminado', undefined, {
                duration: 1500,
              })
              
              this.getUsersService()
            },
            error: () => {
              console.log('Error al eliminar el registro'), 
              this._snackBar.open('Hubo un problema al eliminar el usuario', undefined, {
                duration: 1500,
              })
            }
          });

          // this.getUsersService()
      })
  }


  // Eliminar varios usuarios
  selectedUsers: Users[] = [];
  
  DeleteSelectedUsers() {
    let userIds: string[] = [];

    for( let selectedUser of this.selectedUsers ) {
      userIds.push(selectedUser.id.toString());
    }

    this.dialog.open(DeleteConfirmDialogComponent, {
      data: `¿Realmente quieres eliminar a los usuarios seleccionados?`
    }).afterClosed().subscribe((confirmado: Boolean) => {
      if (!confirmado) return;
      this.userService
        .deleteUsers(userIds)
        .subscribe({
          next: () => {
            this.getUsersService();
          }, 
          error: () => {
            this.getUsersService();
            this.selectedUsers = [];
          }
        })
    })
    
  }

}
