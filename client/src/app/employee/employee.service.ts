import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeDto } from './employee-Dto';
import { Observable, identity } from 'rxjs';
import { Employee } from './all-employee-details.module';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public baseUrl= 'https://localhost:7215/api/Employee'

  constructor(private http: HttpClient) { }

addEmployee(employee :Employee): Observable<Employee> {
  return this.http.post<Employee>(this.baseUrl, employee)
}

getEmployeesFromServer(): Observable<EmployeeDto[]> {
  return this.http.get<EmployeeDto[]>(this.baseUrl)
}
getEmployeeByIdentity(identity:string):Observable<Employee>{
  return this.http.get<Employee>(`${this.baseUrl}/${identity}`)
}
deleteById(identity:string):Observable<any>{
  return this.http.delete(`${this.baseUrl}/${identity}`)
}
}
