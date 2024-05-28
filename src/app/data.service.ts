import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { DealerData } from './dealer-data';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://pv.greatfuturetechno.com/pv-api/dealer/';

  constructor(private http: HttpClient) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Unknown error occurred';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }

  getDealers(): Observable<any> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Token 084f2df6319f2729c860fd3d1393840e41f56f00',
    });
    return this.http
      .get<any>(this.apiUrl, { headers: httpHeaders })
      .pipe(catchError(this.handleError));
  }

  getDealerById(id: number): Observable<any> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Token 084f2df6319f2729c860fd3d1393840e41f56f00',
    });
    return this.http
      .get<any>(
        `${'https://pv.greatfuturetechno.com/pv-api/dealer/?id=3'}/${id}`,
        {
          headers: httpHeaders,
        }
      )
      .pipe(catchError(this.handleError));
  }

  addDealer(dealer: any): Observable<any> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Token 084f2df6319f2729c860fd3d1393840e41f56f00',
    });
    return this.http
      .post<any>(this.apiUrl, dealer, {
        headers: httpHeaders,
      })
      .pipe(catchError(this.handleError));
  }

  updateDealer(id: number, dealer: any): Observable<any> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Token 084f2df6319f2729c860fd3d1393840e41f56f00',
    });
    return this.http
      .put<any>(
        `${'https://pv.greatfuturetechno.com/pv-api/dealer/?id=3'}/${id}`,
        dealer,
        { headers: httpHeaders }
      )
      .pipe(catchError(this.handleError));
  }

  deleteDealer(id: number): Observable<any> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Token 084f2df6319f2729c860fd3d1393840e41f56f00',
    });
    return this.http
      .delete<any>(
        `${'https://pv.greatfuturetechno.com/pv-api/dealer/?id=3'}/${id}`,
        {
          headers: httpHeaders,
        }
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
