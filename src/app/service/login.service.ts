import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from '../model/auth-response.model';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    constructor(private http: HttpClient) {}

    logIn(login: String, password: String): Observable<AuthResponse> {
        return this.http.get<AuthResponse>(`http://localhost:8080/hms/v1/login?login=${login}&password=${password}`)
    }
}