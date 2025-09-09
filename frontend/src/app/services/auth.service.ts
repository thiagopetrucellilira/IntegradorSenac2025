import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { LoginRequest, RegisterRequest, JwtResponse, User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private returnUrl: string = '/dashboard';

  constructor(private http: HttpClient) {
    // Initialize current user from localStorage if available
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(credentials: LoginRequest): Observable<JwtResponse> {
    console.log('=== Auth Service Login ===');
    console.log('Credentials:', credentials);
    console.log('API URL:', `${this.API_URL}/login`);
    
    return this.http.post<JwtResponse>(`${this.API_URL}/login`, credentials)
      .pipe(
        tap(response => {
          console.log('=== Login Success ===');
          console.log('Response:', response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        }),
        catchError((error: any) => {
          console.error('=== Login Error ===');
          console.error('Status:', error.status);
          console.error('Status Text:', error.statusText);
          console.error('Error Details:', error.error);
          console.error('Full Error:', error);
          throw error;
        })
      );
  }

  register(userData: RegisterRequest): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/register`, userData);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    
    // Check if token is expired (basic check)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp;
      
      if (exp && Date.now() >= exp * 1000) {
        console.log('Token is expired');
        this.logout(); // Auto logout if expired
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error checking token validity:', error);
      this.logout(); // Logout if token is malformed
      return false;
    }
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getTokenPayload(): any {
    const token = this.getToken();
    if (!token) return null;
    
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error('Error parsing token:', error);
      return null;
    }
  }

  getUserIdFromToken(): number | null {
    const payload = this.getTokenPayload();
    return payload?.sub || payload?.userId || null;
  }

  setReturnUrl(url: string): void {
    this.returnUrl = url;
  }

  getReturnUrl(): string {
    const url = this.returnUrl;
    this.returnUrl = '/dashboard'; // Reset to default after getting
    return url;
  }
}
