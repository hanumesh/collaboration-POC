import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Importing the pagination module for the application.
import { NgxPaginationModule } from 'ngx-pagination';
import { FileUploadModule } from 'ng2-file-upload';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DeployFirewallsComponent } from './deploy-firewalls/deploy-firewalls.component';
import { TrendsComponent } from './trends/trends.component';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { SearchPipe } from './search.pipe';
import { FirewallService} from './services/firewall.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AlertComponent } from './alert/alert.component';
import { SearchByStatusPipe } from './search-by-status.pipe';
import { FilterByStatusPipe } from './filter-by-status.pipe';
import { FilterByPriorityPipe } from './filter-by-priority.pipe';
import { FilterByPriorityStatusPipe } from './filter-by-priority-status.pipe';
import { FilterByUserPipe } from './filter-by-user.pipe';
import { AutomateIdeasComponent } from './automate-ideas/automate-ideas.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DeployFirewallsComponent,
    TrendsComponent,
    MyTasksComponent,
    SearchPipe,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    SearchByStatusPipe,
    FilterByStatusPipe,
    FilterByPriorityPipe,
    FilterByPriorityStatusPipe,
    FilterByUserPipe,
    AutomateIdeasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    FileUploadModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [FirewallService],
  bootstrap: [AppComponent]
})
export class AppModule { }
