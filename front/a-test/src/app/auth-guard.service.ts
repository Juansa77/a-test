import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Verifica la autenticación aquí utilizando el servicio AuthService y el objeto almacenado en localStorage
    const userInfo = this.authService.getUserInfo();
    console.log(userInfo, "userinfo en guardian")

    if (userInfo && (userInfo.email || userInfo.username)) {
      // El usuario está autenticado, permite el acceso a la ruta
      return true;
    } else {
      // El usuario no está autenticado, redirige a la página de inicio de sesión o a otra página
      this.router.navigate(['/login']);
      return false;
    }
  }
}
