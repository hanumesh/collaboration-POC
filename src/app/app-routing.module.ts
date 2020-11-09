import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrendsComponent } from './trends/trends.component';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './helpers/auth.guard';
import { AutomateIdeasComponent } from './automate-ideas/automate-ideas.component';
import { QuestionsComponent } from './questions/questions.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  {path: "signup", component: RegisterComponent},
  {path: "automateIdeas", component: AutomateIdeasComponent},
  {path: "questions", component: QuestionsComponent},
  {path: "trends", component: TrendsComponent},
  {path: "my-tasks", component: MyTasksComponent},

// 1st approach otherwise redirect to home
  { path: "**", redirectTo: "" }
// 2nd approach
//  {path: "", pathMatch: "full",redirectTo: "deployfirewalls"},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
