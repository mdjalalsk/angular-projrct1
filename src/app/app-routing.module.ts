import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListStudentsComponent } from './list-students/list-students.component';
import{AddStudentsComponent} from'./add-students/add-students.component';
import { CommonModule } from '@angular/common';
import { EditStudentsComponent } from './edit-students/edit-students.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { UserComponent } from './user/user.component';
import { AboutComponent } from './about/about.component';



const routes: Routes = [
  { path: '', component: ListStudentsComponent,pathMatch: 'full'},
  {path: 'add-student',component: AddStudentsComponent},
  {path: 'edit/:id',component: EditStudentsComponent},
  {path: 'home',component: HomeComponent},
  {path: 'contact',component: ContactComponent},
  {path: 'user',component: ListStudentsComponent},
  {path: 'about',component: AboutComponent},
  
  
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,
      // { enableTracing: true }
      )
    
  ],
    
  exports: [RouterModule]
})
export class AppRoutingModule { }
