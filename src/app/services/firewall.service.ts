import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/*
export class Firewall{
  constructor(
    public FirewallID:string,
    public TaskName:string,
    public Status:string,
    public Priority:string,
    public CreatedBy: string,
    public UpdatedOn: string,
    public Comments: object
  ) {}
}
*/
@Injectable({
  providedIn: 'root'
})
export class FirewallService {

private listOfFirewalls: any = [
];

  private baseUrl = '/api/v1/firewalls';
  constructor(private http: HttpClient) {    
   }

   getAllFirewalls(): Observable<any>{
    //return this.http.get<any>('this.baseUrl');
    // alert("getAllFirewalls");
    return this.listOfFirewalls;
   }
}
