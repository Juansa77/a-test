import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,  private router:Router) { }

  //*Subscribirse a los cambios en el booleano
  public authStateSubject = new Subject<boolean>();
  notifyAuthStateChange(isAuthenticated: boolean) {
    this.authStateSubject.next(isAuthenticated);
  }

  //* Método para hacer el login en el la app
  login(username: string, password: string) {
    console.log(username, password, "in loginauth")
    const backendUrl: string = "http://localhost:8490/api/v1/users/login/";
    const body = { username, password };
    return this.http.post(backendUrl, body);
  }

  storeUserInfo(response: any) {
    const userInfo = {
      email: response.user.email,
      username: response.user.username,
      token:response.token,
      id:response.user._id


    };
    //* Almacena la información del usuario en el localStorage
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    console.log(userInfo, "userinfo en authservice")
  }
//*Método para acceder al token
  getToken(): string | null {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      return user.token;
    }
    return null;
  }

  getUserInfo() {
    //* Obtiene la información del usuario del localStorage
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  }

  //* TO-DO EN EL BACKEND
  logout() {
    localStorage.removeItem('userInfo');
    this.router.navigate(['']);
  }
}
