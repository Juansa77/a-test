import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  //*Inyectamos las dependencias en el constructor: Rooter, activated routed, HTTP y authservice

  userId: string | null = '';
  token: string | null = "";
  user: any = {}
  editing = false;
  newUsername = '';
  newEmail = "";
  originalUsername: string = '';
  originalEmail: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  //*En el inicio, nos subscribimos al paramMap para extraer la ID
  ngOnInit() {


    this.route.paramMap.subscribe((params) => {
      //*Nos traemos la user ID de los params
      this.userId = params.get('id');
    });

    //* Funcionalidad para llamada al controlador de detalle-----
    const backendUrl: string =
      `http://localhost:8490/api/v1/users/userdetail/${this.userId}`;
    //*Token  y headers para AuthGuard y verificar ruta protegida
    this.token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    this.http.get<any>(backendUrl, { headers: headers }).subscribe(
      (response) => {
        this.user = response
      },
      (error) => {
        console.error('Error al obtener el usuario', error);
      }
    )
  }
  //*--Función para actualizar------
  updateUser() {
    if (this.newUsername !== this.originalUsername || this.newEmail !== this.originalEmail){
      const updatedData = {
        username: this.newUsername,
        email: this.newEmail
      };
      const backendUrl: string = `http://localhost:8490/api/v1/users/update/${this.userId}`
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      });
      this.http.patch(backendUrl, updatedData, { headers: headers }).subscribe(
        (response) => {
          console.log(response)
          //*Forzar actualización de la vista con cambios
          this.user = response;

        },
        (error) => {
          console.error('Error al actualizar el usuario', error);
        }
      );
    }



  }
  //**Funcionalidad para activar o cancelar el formulario de Update */
  enableEdit() {
    this.editing = true;
    this.newUsername = this.user.username;
  }
  cancelEdit() {
    this.editing = false;
  }

    //**Funcionalidad para ELIMINAR USUARIO */
  deleteUser() {

    const backendUrl: string = `http://localhost:8490/api/v1/users/delete/${this.userId}`
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    this.http.delete(backendUrl, { headers: headers }).subscribe(
      (response) => {
        console.log(response)
        this.router.navigateByUrl('/users');


      },
      (error) => {
        console.error('Error al borrar el usuario', error);
      }
    );
  }

  //*Función de botón de confirmación para eliminar usuario

  confirmDeleteUser() {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');

    if (confirmed) {
      //*Llmamaos a deleteUser
      this.deleteUser();
    }
  }
}
