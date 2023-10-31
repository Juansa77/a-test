import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  //*Instanciamos un nuevo registro con FormGroup del core de Angular
  registrationForm: FormGroup;
  //* inyectamos la dependencia de la variable HTTP y Router de los datos que va a tomar de Httpclient
  constructor(private http: HttpClient, private router:Router) {
    //* Definimos la formgroup con las validaciones de cada campo
    this.registrationForm = new FormGroup({
      username: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)])
    });
  }
  //* Función al hacer register; toma los datos del form group
  registerUser() {
    if (this.registrationForm.valid) {
      const userData = this.registrationForm.value;

      //* URL DEL BACKEND
      const backendUrl:string = 'http://localhost:8490/api/v1/users/register';
//*Usamos HTTP PARA ENVIAR LOS DATOS EN LA URL
      this.http.post(backendUrl, userData).subscribe(
        (response) => {
          //* register ok
          console.log('Registro exitoso', response);
          this.router.navigate(['/users']);
        },
        (error) => {
          //* Error register
          console.error('Error en el registro', error);
        }
      );

    }
  }



}
