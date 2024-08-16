import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private sanitizer: DomSanitizer,
    private toastr: ToastrService
  ) { }

  sanitizeInput(input: string): string {
    // Aquí podrías aplicar más lógica de sanitización si es necesario
    return this.sanitizer.sanitize(1, input) || ''; // 1 representa el contexto de HTML
  }

  onSubmit(): void {
    //Sanitización de las entradas 
    this.email = this.sanitizeInput(this.email);
    this.password = this.sanitizeInput(this.password);

    if (!this.validateEmail(this.email)) {
      this.toastr.error('Correo electrónico no válido.', 'Error de inicio de sesión');
      return;
    }

    if (!this.validatePassword(this.password)) {
      this.toastr.error('Contraseña no válida.', 'Error de inicio de sesión');
      return;
    }

    this.authService.login(this.email, this.password).subscribe(
      response => {
        // Manejar la respuesta del backend
        console.log('Inicio de sesión exitoso', response);
        this.toastr.success('Inicio de sesión exitoso', 'Éxito');
        this.router.navigate(['/home']); // Redirigir al usuario a la página de inicio
      },
      error => {
        // Manejar errores
        console.error('Error en el inicio de sesión', error);
        this.toastr.error('Error en el inicio de sesión', 'Error');
      }
    );
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  }

  validatePassword(password: string): boolean {
    return password.length >= 8;
  }
}