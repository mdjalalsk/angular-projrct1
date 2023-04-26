import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { StudentsService } from '../students.service';



@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css']
})
export class AddStudentsComponent implements OnInit {
  addForm: any;
  hobbyList: any = ['Playings cricket', 'Watching TV', 'Reading Books', 'Travelling'];
  hobbyArray: any[] = [];
  vals = '';
  data = this.vals.split(',');

  constructor(private formBulder: FormBuilder,
    private router: Router,
    private studentservice: StudentsService) {
    this.addForm = this.formBulder.group({
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
    this.setAutorized(this.data)
  }
  onSubmit() {
    // console.log(this.addForm.value)
     this.studentservice.createStudent(this.addForm.value).subscribe(
      (data:any)=>{
       this.router.navigate(['/']);
      },
      
     );
     
     
  }

}
