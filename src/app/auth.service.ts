import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//1. Patron Service

@Injectable({
//Este decorador indica que esta clase puede ser inyectada en otras partes de la aplicación.
  providedIn: 'root'
})
export class AuthService {
  //Cambia en el servidor y local 
  //localmente:
  private baseUrl= 'http://localhost:3000';
  //servidor aws:
  //private baseUrl='https://52.203.37.191:3000';

  constructor(private http: HttpClient) { }
  //Angular proporciona el HttpClient para realizar solicitudes HTTP.
  //Aquí se usa para enviar una solicitud de inicio de sesión al backend.

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, { email, password });
  }
  //Este método acepta un correo electrónico y una contraseña, y devuelve un 
  //Observable que se suscribe en el componente para manejar la respuesta del servidor
}
