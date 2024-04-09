import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModule } from '../models/user.module';
import { Observable } from 'rxjs';
interface LoginResponse {
  token: string;
  
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
public baseUrl='https://localhost:7215/api/Auth'
  constructor(private http:HttpClient) { }

  login(user:UserModule):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.baseUrl,user)
  }
  getIsTrueToken():Observable<boolean>{
    const headers=new HttpHeaders({
   
      'Authorization':`Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<boolean>('https://localhost:7215/api/Auth/verifyToken',{headers});
  }
}
