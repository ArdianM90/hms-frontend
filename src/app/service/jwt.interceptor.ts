import {
  HttpRequest,
  HttpInterceptorFn,
  HttpHandlerFn, HttpEvent
} from '@angular/common/http';
import {Observable} from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    const token: string | null = localStorage.getItem('jwt');
    if (token) {
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
    }
    return next(req);
}
