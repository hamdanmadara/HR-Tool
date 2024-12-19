import { Inject, Injectable,NgZone } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
// import { environment as env } from 'src/environments/environment';
// import { map, Observable } from 'rxjs';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import firebase from 'firebase/compat/app';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private ngZone: NgZone,
    // private cookieService: CookieService
    @Inject(CookieService) private cookieService: CookieService
  ) { 
    // this.loadGoogleScript();
  }

  signUp(payloadInfo:any): Observable<any> {
    console.log(payloadInfo)
    return this.http.post(`${environment?.baseURL}${environment?.register}`,payloadInfo).pipe(
      catchError(error => {
        console.error('signup Error:', error);
        
        // Check if there's a response body in the error
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          console.error('Client-side error:', error.error.message);
        } else {
          // Server-side error
          console.error('Server-side error status:', error.status);
          console.error('Server-side error body:', error.error);
        }

        return throwError(() => error);
      })
    );
  }

  login(payloadInfo:any): Observable<any> {
    console.log(payloadInfo)
    return this.http.post(`${environment?.baseURL}${environment?.login}`,payloadInfo).pipe(
      catchError(error => {
        console.error('Login Error:', error);
        
        // Check if there's a response body in the error
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          console.error('Client-side error:', error.error.message);
        } else {
          // Server-side error
          console.error('Server-side error status:', error.status);
          console.error('Server-side error body:', error.error);
        }

        return throwError(() => error);
      })
    );
  }

  createOrganization(payloadInfo:any): Observable<any> {
    console.log(payloadInfo)
    return this.http.post(`${environment?.baseURL}${environment?.createOrganization}`,payloadInfo).pipe(
      catchError(error => {
        console.error('Error:', error);
        
        // Check if there's a response body in the error
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          console.error('Client-side error:', error.error.message);
        } else {
          // Server-side error
          console.error('Server-side error status:', error.status);
          console.error('Server-side error body:', error.error);
        }

        return throwError(() => error);
      })
    );
  }

  getProfile(){
    return this.http.get(`${environment?.baseURL}${environment?.getProfile}`).pipe(
      // map(response => response), // Transform or process data if needed
      catchError(error => {
        console.error('Error fetching posts:', error);
        return throwError(() => new Error('Failed to fetch posts'));
      })
    );
  }

  storeToken(token: string): void {
    localStorage.setItem('token', token); // Save the token to localStorage
  }

  getToken(): string | null {
    return localStorage.getItem('token'); // Retrieve the token from localStorage
  }
  
  isLoggedIn(){
    return this.getToken()
  }

  clearToken(): void {
    localStorage.removeItem('token'); // Clear the token from localStorage
  }

  logout(): Observable<any> {
    // console.log(payloadInfo)
    return this.http.post(`${environment?.baseURL}${environment?.logout}`,{}).pipe(
      // map(response => response), // Transform or process data if needed
      catchError(error => {
        console.error('Error fetching posts:', error);
        return throwError(() => new Error('Failed to fetch posts'));
      })
    );
  }


 
 

}
