import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from './employee/models/position';
@Injectable({
  providedIn: 'root'
})
export class PositionService {

  public baseUrl='https://localhost:7215/api/Positions'
  constructor(private http:HttpClient) { }

  addPosition(position:Position):Observable<Position>{
    return this.http.post<Position>(this.baseUrl,position)
  }
  getPositions():Observable<Position[]>{
    return this.http.get<Position[]>(this.baseUrl)
  }

}
