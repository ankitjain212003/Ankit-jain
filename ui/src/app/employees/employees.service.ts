import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common'

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Employ } from './employees.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private employeesUrl = 'api/employee/';
  constructor(private http: HttpClient, private datepipe: DatePipe) { }

  getEmployees(): Observable<Employ[]> {
    return this.http.get<Employ[]>(this.employeesUrl).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  createEmploy(employ: Employ): Observable<Employ[]> {
    employ.dateOfBirth = this.datepipe.transform(employ.dob, 'dd-MM-yyyy')
    return this.http.post<Employ[]>(this.employeesUrl, employ).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    )
  }

  editEmploy(employ: Employ): Observable<Employ[]> {
    employ.dateOfBirth = this.datepipe.transform(employ.dob, 'dd-MM-yyyy')
    return this.http.put<Employ[]>(this.employeesUrl + employ.id, employ).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  deleteEmploy(id: number): Observable<Employ[]> {
    return this.http.delete<Employ[]>(this.employeesUrl + id).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }
}