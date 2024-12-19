import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpHandlerFn, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/Auth/auth.service';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private authService: AuthService) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
//     const token = this.authService.getToken();
//     console.log("tokeeeeeeeeeeen",token)

//     if (token) {
//       // Create a new request with the Authorization header
//       const authReq = req.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       return next.handle(authReq);
//     }

//     return next.handle(req);
//   }
// }

export const AuthInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
    // Use inject() to get the AuthService
    const authService = inject(AuthService);

    const token = authService.getToken();
    console.log("Interceptor Token:", token);

    if (token) {
        const cloned = req.clone({
            setHeaders: {
                // Use 'Authorization' with 'Bearer ' prefix
                Authorization: `Bearer ${token}`,
            },
        });
        return next(cloned);
    } else {
        return next(req);
    }
};