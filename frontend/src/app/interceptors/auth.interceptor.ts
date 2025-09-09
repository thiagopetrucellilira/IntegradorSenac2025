import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  
  console.log('=== Auth Interceptor ===');
  console.log('Request URL:', req.url);
  console.log('Request method:', req.method);
  console.log('Token exists:', !!token);
  
  // Skip adding token for login and register requests
  const isAuthRequest = req.url.includes('/auth/login') || req.url.includes('/auth/register');
  
  if (token && !isAuthRequest) {
    console.log('Token (first 20 chars):', token.substring(0, 20) + '...');
    console.log('Adding auth token to request');
    
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    
    console.log('Authorization header added:', authReq.headers.get('Authorization')?.substring(0, 20) + '...');
    
    return next(authReq).pipe(
      catchError((error) => {
        console.error('=== Request Error ===');
        console.error('Status:', error.status);
        console.error('Error:', error.error);
        
        if (error.status === 401) {
          console.error('Unauthorized request - token may be invalid or expired');
          console.error('Token used:', token);
        }
        return throwError(() => error);
      })
    );
  }
  
  if (isAuthRequest) {
    console.log('Auth request detected - skipping token');
  } else {
    console.log('No token found for request');
  }
  
  return next(req).pipe(
    catchError((error) => {
      console.error('=== Request Error (No Auth) ===');
      console.error('Status:', error.status);
      console.error('Error:', error.error);
      console.error('URL:', req.url);
      return throwError(() => error);
    })
  );
};
