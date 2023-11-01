
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isLoggedIn = false;
  private authStateSubscription: Subscription;

  registrationForm: FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.registrationForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

    this.authStateSubscription = this.authService.authStateSubject.subscribe(
      (isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
      }
    );
    const token = this.authService.getToken();
    this.isLoggedIn = !!token;

  }

  registerUser() {
    if (this.registrationForm.valid) {
      const userData = this.registrationForm.value;

      const backendUrl: string = 'http://localhost:8490/api/v1/users/register';

      this.http.post(backendUrl, userData).subscribe(
        (response) => {
          console.log('Registro exitoso', response);
          if (this.isLoggedIn == true) {
            this.router.navigate(['/users']);
          } else {
            this.router.navigate([""]);
          }
        },
        (error) => {
          console.error('Error en el registro', error);
        }
      );
    }
  }
}
