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
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, body, { withCredentials: true });
  }

  logOut(): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/logout`, {}, { withCredentials: true });
  }

  refreshToken(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/refresh`, {}, { withCredentials: true });
  }

  clearToken(): void {
    localStorage.removeItem('jwt');
  }
}
