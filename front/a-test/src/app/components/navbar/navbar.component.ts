import { Component, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy{
  isLoggedIn = false;
  private authStateSubscription: Subscription;

  //*Inyectamos authservice
  constructor(private authService: AuthService) {
// *Establece isLoggedIn en true si hay un token, de lo contrario, en false.
    const token = this.authService.getToken();
    this.isLoggedIn = !!token;

    //* Suscribirse a cambios en el estado de autenticación
    this.authStateSubscription = this.authService.authStateSubject.subscribe((isAuthenticated) => {
      this.isLoggedIn = isAuthenticated;
    });
  }
//*Nos desuscribimos al evento
  ngOnDestroy() {
    this.authStateSubscription.unsubscribe();
  }
  logout() {

    this.authService.logout();
    this.isLoggedIn = false;
  }

}
