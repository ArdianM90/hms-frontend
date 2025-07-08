import {
  HttpRequest,
  HttpInterceptorFn,
  HttpHandlerFn, HttpEvent, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {inject} from '@angular/core';
import {AuthService} from './auth.service';
import {AuthResponse} from '../model/auth-response.model';
import {Router} from '@angular/router';

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
  const router: Router = inject(Router);
  return sendRequestWithToken(req, next, token).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && error.error?.error === 'TOKEN_EXPIRED') {
        return authService.refreshToken().pipe(
          switchMap((response: AuthResponse) => {
            localStorage.setItem('jwt', response.jwt);
            return sendRequestWithToken(req, next, response.jwt);
          }),
          catchError((err) => {
            authService.clearTokens();
            router.navigate(['/login-page']);
            return throwError((): HttpErrorResponse => err);
          })
        );
      } else if (error.status === 401) {
        authService.clearTokens();
        router.navigate(['/login-page']);
        return throwError((): HttpErrorResponse => error);
      } else {
        return throwError((): HttpErrorResponse => error);
      }
    })
  );
}
