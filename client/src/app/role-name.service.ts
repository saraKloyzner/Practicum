import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleName } from './role-name';

@Injectable({
  providedIn: 'root'
})
export class RoleNameService {

  public baseUrl='https://localhost:7215/api/RoleName'
  constructor(private http:HttpClient) { }

  addRole(role:RoleName):Observable<RoleName>{
    return this.http.post<RoleName>(this.baseUrl,role)
  }
  getRolesName():Observable<RoleName[]>{
    return this.http.get<RoleName[]>(this.baseUrl)
  }

}
