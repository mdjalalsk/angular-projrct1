import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { StudentsService } from '../students.service';



@Component({
  selector: 'app-edit-students',
  templateUrl: './edit-students.component.html',
  styleUrls: ['./edit-students.component.css']
})
export class EditStudentsComponent implements OnInit {

  addForm: any;
  hobbyList: any = ['Playings cricket', 'Watching TV', 'Reading Books', 'Travelling'];
  hobbyArray: any[] = [];
  vals = '';
  data = this.vals.split(',');
  student_id:any;
  hobbies: any;
  hbs: any;
  

  constructor(private formBulder: FormBuilder,
    private router: Router,
    private studentservice: StudentsService,
    private url:ActivatedRoute,
    ) {
    this.addForm = this.formBulder.group({
      id:[],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      gender: ['', Validators.required],
      hobbyField: new FormControl(this.data),
      country: ['', Validators.required],
    }
    )
  }
  get athurizedArray() {
    return this.addForm.get("hobbyField") as FormArray;
  }

  setAutorized(data: string[]) {
    return this.hobbyArray = this.hobbyList.map((x: any) => ({
      name: x,
      value: data.indexOf(x) >= 0
    }));
  }

  parse() {
    const result = this.hobbyList.map(
      (x: any, index: any) => (this.hobbyArray[index].value ? x : null)
    ).filter((x: any) => x);

    return result.length > 0 ? result : null;
  }

  ngOnInit(): void {
    this.student_id = this.url.snapshot.params['id'];
    if (this.student_id>0){
      this.studentservice.getSingleStudent(this.student_id).subscribe(
        (data: any) => {
          // console.log(data.data)
          this.addForm.patchValue(data.data);
          this.hobbies=data.data.hobbies;
          this.hbs=this.hobbies.split(',')
          // console.log(this.hbs[1]);
          this.setAutorized(this.hbs)
        }
      )
    }
    
  }
  onedit(){
    // console.log(this.addForm.value)
     this.studentservice.editStudent(this.addForm.value).subscribe(
      (data:any)=>{
       this.router.navigate(['/']);
      }
     );
     
  }
}
