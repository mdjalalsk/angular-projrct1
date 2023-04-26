import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomServiceService {

  constructor(private http:HttpClient) { }
  getRoom(){
    return this.http.get("http://localhost/angular/curd/ngapi/api.php")
  }

}
