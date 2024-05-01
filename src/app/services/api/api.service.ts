import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as env } from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = env.API_ROOT;

  constructor(
    private http: HttpClient
  ) {}

  fetchData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/todos/1`).pipe(
      catchError((error) => {
        let errorMessage = 'An error occurred while fetching data';
        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente
          errorMessage = `Client-side error: ${error.error.message}`;
        } else {
          // Error del lado del servidor
          errorMessage = `Server-side error: ${error.status} - ${error.error}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}
