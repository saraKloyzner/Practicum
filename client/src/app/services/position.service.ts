import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from '../models/position';
import { PositionPostModel } from '../models/PositionPostModel.module';
@Injectable({
  providedIn: 'root'
})
export class PositionService {

  public baseUrl='https://localhost:7215/api/Positions'
  constructor(private http:HttpClient) { }

  addPosition(position:PositionPostModel):Observable<Position>{
    const headers=new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<Position>(this.baseUrl,position,{headers})
  }
  getPositions():Observable<Position[]>{
    return this.http.get<Position[]>(this.baseUrl)
  }

}
