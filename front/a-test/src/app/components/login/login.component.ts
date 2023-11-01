import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log(username, password)
      this.authService.login(username, password).subscribe(
        (response) => {
          console.log('Inicio de sesión exitoso', response);
          this.authService.storeUserInfo(response); //* Almacena la información del usuario
          this.router.navigate(['/users']);
          //*notificamos cambio de estado de autentificación
          this.authService.notifyAuthStateChange(true)
        },
        (error) => {
          console.error('Inicio de sesión fallido', error);
        }
      );
    }
  }
}
