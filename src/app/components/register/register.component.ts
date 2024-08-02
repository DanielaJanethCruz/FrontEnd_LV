import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


//2. Patrón Modelo Vista Controlador


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  //Propiedades del modelo para almacenar los datos del formulario
  name: string = '';
  email: string = '';
  password: string = '';
  repassword: string = '';
  role: String ='user';

  constructor(private http: HttpClient, private router: Router) {}

  //Método que maneja el envio del formulario
  onSubmit(): void {
    //Validación simple para verificar la coincidencia de las contraseñas
    if (this.password !== this.repassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    //Creación del objeto usuario que será enviado al backend
    const user = {
      email: this.email,
      password: this.password,
      role: this.role
    };
    //localmente:
    //this.http.post('http://localhost:3000/usuario/', user).subscribe(
    //en el servidor:
    //Envio de la solicitud HTTP POST al backend
    this.http.post('https://52.203.37.191/usuario/',user).subscribe(
      response => {
        //manejo de la respuesta del backend
        console.log('Registro exitoso', response);
        // Navegación a la página de inicio de sesión después del registro exitoso
        this.router.navigate(['/login']);
      },
      error => {
        // Manejo de errores en la solicitud HTTP
        console.error('Error en el registro', error);
      }
    );
  }
}
