import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable, tap } from 'rxjs';
import { StartSignupInterface } from '../interfaces/StartSignupInterface.interface';
import { ApiResponseStatus } from '@/app/shared/enums/api-response-status.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  startSignup(startSignup: StartSignupInterface): Observable<any> {
    console.log(startSignup);
    return this.http
      .post<any>(
        `${this.apiBaseUrl}/user-service/api/v1/users/signup`,
        startSignup
      )
      .pipe(
        tap((response) => {
          if (response.status.toUpperCase() !== ApiResponseStatus.Success) {
            throw new Error('Failed to start signup process');
          }
        })
      );
  }
}
