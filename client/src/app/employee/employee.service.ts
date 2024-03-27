import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public baseUrl= 'https://localhost:7215/api/Employee'

  constructor(private http: HttpClient) { }

addEmployee(employee :Employee): Observable<Employee[]> {
  return this.http.post<Employee[]>(this.baseUrl, employee)
}

getEmployeesFromSever(): Observable<Employee[]> {
  return this.http.get<Employee[]>(this.baseUrl)
}

}
