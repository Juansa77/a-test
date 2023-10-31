import { Component, OnInit } from '@angular/core';
import { User } from './interfaces/user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  users:any;
  token: string |null = "";

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    const backendUrl: string = 'http://localhost:8490/api/v1/users/getusers';
    this.token = this.authService.getToken();
    console.log(this.token, "token")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` // Agrega el token con el prefijo "Bearer"
    });

    this.http.get<any>(backendUrl, { headers: headers }).subscribe(
      (response) => {
        this.users =  Object.keys(response).map(key => response[key]);
        console.log(response)

      },
      (error) => {
        console.error('Error al obtener la lista de usuarios', error);
      }
    );
  }
}
