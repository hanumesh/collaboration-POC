import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { DeployFirewallsComponent } from './deploy-firewalls/deploy-firewalls.component';
import { TrendsComponent } from './trends/trends.component';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './helpers/auth.guard';
import { AutomateIdeasComponent } from './automate-ideas/automate-ideas.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  {path: "register", component: RegisterComponent},
  {path: "automateIdeas", component: AutomateIdeasComponent},
  // {path: "deployfirewalls", component: DeployFirewallsComponent},
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
