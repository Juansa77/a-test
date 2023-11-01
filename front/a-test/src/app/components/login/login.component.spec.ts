import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
//*Módulo de pruebas
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      //*Servicios que necesita el componente
      providers: [AuthService, Router],
      //*Importaciones que necesita el componente
      imports: [ReactiveFormsModule, HttpClientTestingModule],
    });
    //*Instancia de componente
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    //*Deteccicón de cambios en el componente
    fixture.detectChanges();
  });
//* 1º Prueba: creación de componente---------
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //*2. Inicio correcto del formulario---------
  it('should initialize the login form', () => {
    expect(component.loginForm).toBeTruthy();
    expect(component.loginForm.get('username')).toBeTruthy();
    expect(component.loginForm.get('password')).toBeTruthy();
  });



});
