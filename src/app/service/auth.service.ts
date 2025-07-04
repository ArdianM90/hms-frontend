import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthResponse} from '../model/auth-response.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  logIn(login: String, password: String): Observable<AuthResponse> {
    const body = {login, password};
    return this.http.post<AuthResponse>(`${environment.apiUrl}/login`, body, { withCredentials: true });
  }

  refreshToken(): Observable<AuthResponse> {
    console.log('Pytam o odświeżenie tokena.');
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/refresh`, {}, { withCredentials: true });
  }

  clearTokens() {
    localStorage.removeItem('jwt');
  }
}
