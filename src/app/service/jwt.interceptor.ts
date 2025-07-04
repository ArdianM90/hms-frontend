import {
  HttpRequest,
  HttpInterceptorFn,
  HttpHandlerFn, HttpEvent, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {inject} from '@angular/core';
import {AuthService} from './auth.service';
import {AuthResponse} from '../model/auth-response.model';

function sendRequestWithToken(req: HttpRequest<any>, next: HttpHandlerFn, token: string | null): Observable<HttpEvent<any>> {
  if (token && !req.url.includes('/auth/refresh')) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }
  return next(req);
}

export const jwtInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const authService: AuthService = inject(AuthService);
  const token: string | null = localStorage.getItem('jwt');
  console.log("Token z local storage: " + token);
  return sendRequestWithToken(req, next, token).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log("Interceptor caught an error:", error);
      if (error.status === 401 && error.error?.error === 'TOKEN_EXPIRED') {
        console.log("ERROR: " + error.status + ", " + error.error?.error)
        return authService.refreshToken().pipe(
          switchMap((response: AuthResponse) => {
            console.log("Tokens refreshed. JWT: " + response.jwt);
            localStorage.setItem('jwt', response.jwt);
            return sendRequestWithToken(req, next, response.jwt);
          }),
          catchError((err) => {
            console.log("Error while refreshing tokens.");
            authService.clearTokens();
            return throwError(() => err);
          })
        );
      } else {
        console.log("NIE ERROR: " + error.status + ", " + error.error?.error)
      }
      return throwError((): HttpErrorResponse => error);
    })
  );
}
