import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Profile } from '../models/profile';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  // Crear una instancia de HttpClient
  constructor( private http: HttpClient ) { }

  // Definir la URL
  url = environment.apiURL;
  urlVista = this.url + 'vista/';
  urlBuscar = this.url + 'buscar/';
  urlNuevo = this.url + 'nuevo/';
  urlActualizar = this.url + 'actualizar/';
  urlEliminar = this.url + 'eliminar/';
  urlEliminarVarios = this.url + 'eliminar-varios/';
  urlLogin = this.url + 'login/';

  // Método GET

  // Get all users
  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.urlVista) // Lo almacena
  }

  // Get one user
  getUser(userId: any): Observable<any> {
    const url = this.urlBuscar + userId;
    return this.http.get<any>(url)
  }

  // Login

  loginUser(email: any): Observable<any> {
    const url = this.urlLogin + email;
    return this.http.get<any>(url);
  }

  // Get profile picture
  getProfilePicture(): Observable<Profile[]> {
    const url = 'https://rickandmortyapi.com/api/character/';
    return this.http.get<Profile[]>(url)
  }


  // Método POST

  postUser(user: Users): Observable<Users>{
    return this.http.post<Users>(this.urlNuevo, user)
  }

  // Método UPDATE

  updateUser(user: any): Observable<any> {
    const url = this.urlActualizar + user.id; // la url es el endpoint para actualizar usuario
    return this.http.put<any>(url, user);
  }

  // Método DELETE

  deleteUser(userId: string): Observable<string> {
    const url = this.urlEliminar + userId;
    return this.http.delete<string>(url);
  }

  // Eliminar varios usuarios

  deleteUsers(ids: string[]) {
    const url = this.urlEliminarVarios;
    return this.http.request('delete', url, {body: {ids}});
  }

  // Método GET para el Interceptor

  getAllInterceptor(): Observable<any> {
    // Al ejecutar la API, necesita saber cual es la respuesta(response)
    return this.http.get(this.urlVista, {observe: 'response'})
  }


  // Comunicar componentes login y nav

  private userId = new BehaviorSubject(localStorage.getItem('id') || 0);
  currentUserId = this.userId.asObservable();

  changeUserId(id: any) {
    localStorage.setItem('id', id)
    this.userId.next(id);
  }
}
