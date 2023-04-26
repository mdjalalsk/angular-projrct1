import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Students } from "./students";
@Injectable({
    providedIn:'root'
})
export class StudentsService{
    constructor(private http: HttpClient){ }
    baseUrl:string='http://localhost/angular/curd/phprestAPI/';
    getStudents(){
        return this.http.get<Students[]>(this.baseUrl+"view.php");
    }
    getSingleStudent(id:any){
        return this.http.get<Students[]>(this.baseUrl+"view.php?id="+id);
    }
    deleteStudent (id:any){
        return this.http.delete(this.baseUrl+'delete.php?id='+ id);
    }
    createStudent(student:any){
        return this.http.post(this.baseUrl+'insert.php',student);
    }
    editStudent(student:any){
        return this.http.put(this.baseUrl+'update.php',student);
    }
    // roomsApi(){
    //     this.http.get('http://localhost/angular/curd/ngapi/');
    // }
}
   
