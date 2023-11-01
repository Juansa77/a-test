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
  showErrorMessage: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(2)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
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

    else{
      this.showErrorMessage = true;
      console.log("loquesea")
    }
  }
}
