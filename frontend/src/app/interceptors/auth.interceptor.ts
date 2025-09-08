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
  
  if (token) {
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
  
  console.log('No token found for request');
  return next(req);
};
