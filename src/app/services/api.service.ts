import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const API_SERVER = 'https://event-player.vertikaliti.com';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public createNewUserEvent: EventEmitter<any> = new EventEmitter();
  public editUserEvent: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient,) { }

  createUser(data: any): Observable<any> {
    return this.http.post(`${API_SERVER}/user`, { ...data });
  }

  getUser(): Observable<any> {
    return this.http.get(`${API_SERVER}/user`).pipe(map(res => res));
  }

  deleteUser(item: any): Observable<any> {
    return this.http.delete(`${API_SERVER}/user/${item}`);
  }

  updateUser(data: any, id: string): Observable<any> {
    
    
    return this.http.patch(`${API_SERVER}/user/${id}`, data );
  }
}


