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
  {
     "FirewallID":"FFD134",
     "TaskName":"Deloy 1",
     "Status":"Completed",
     "Priority":"Low",
     "CreatedBy":"TestName1",
     "UpdatedOn":"12-10-2020 07:25 PM",
     "Comments":{
        "message":"File Upload Completed",
        "status":"Completed",
        "files":{
           "output_file":[
              "add IPAddress Name=SAE21-shwapint-1-7-10-0 Address=10.16.128.0/21",
              "add IPAddress Name=SAE21-shwapint-1-7-10-1 Address=10.16.136.0/21",
              "add IPAddress Name=SAE21-shwapint-1-6-11-0 Address=10.16.144.0/21"
           ],
           "log_file":[
              "2020-10-13 13:21:18,227 - extract_service_info - Service string with Name = ICMP and protocol type = None can not be traced",
              "2020-10-13 13:21:18,228 - extract_service_info - Service string with Name = SSH and protocol type = TCP can not be traced"
           ]
        }
     }
  },
  {
     "FirewallID":"FM312",
     "TaskName":"Firewall 2",
     "Status":"Failed",
     "Priority":"High",
     "CreatedBy":"TestName2",
     "UpdatedOn":"12-10-2020 05:25 PM",
     "Comments":{
        "message":"File Upload Failed",
        "status":"Failed",
        "files":{
           "output_file":[
              "add IPAddress Name=SAE21-shwapint-1-7-10-0 Address=10.16.128.0/21",
              "add IPAddress Name=SAE21-shwapint-1-7-10-1 Address=10.16.136.0/21",
              "add IPAddress Name=SAE21-shwapint-1-6-11-0 Address=10.16.144.0/21"
           ],
           "log_file":[
              "2020-10-13 13:21:18,227 - extract_service_info - Service string with Name = ICMP and protocol type = None can not be traced",
              "2020-10-13 13:21:18,228 - extract_service_info - Service string with Name = SSH and protocol type = TCP can not be traced"
           ]
        }
     }
  },
  {
     "FirewallID":"FU453",
     "TaskName":"Depl Fire 3",
     "Status":"In Progress",
     "Priority":"Medium",
     "CreatedBy":"TestName3",
     "UpdatedOn":"12-10-2020 11:25 AM",
     "Comments":{
        "message":"File Upload In Progress",
        "status":"In Progress",
        "files":null
     }
  },
  {
     "FirewallID":"FFD761",
     "TaskName":"Task 4",
     "Status":"Requested",
     "Priority":"Critical",
     "CreatedBy":"TestName4",
     "UpdatedOn":"12-10-2020 10:25 AM",
     "Comments":{
        "message":"File Upload Requested",
        "status":"Requested",
        "files":null
     }
  },
  {
     "FirewallID":"FM313",
     "TaskName":"Deloy 12",
     "Status":"Planned",
     "Priority":"Low",
     "CreatedBy":"TestName5",
     "UpdatedOn":"11-10-2020 08:25 PM",
     "Comments":{
        "message":"File Upload Planned",
        "status":"Planned",
        "files":null
     }
  },
  {
     "FirewallID":"FU454",
     "TaskName":"Firewall2 2",
     "Status":"In Progress",
     "Priority":"High",
     "CreatedBy":"TestName6",
     "UpdatedOn":"11-10-2020 08:15 PM",
     "Comments":{
        "message":"File Upload In Progress",
        "status":"In Progress",
        "files":null
     }
  },
  {
     "FirewallID":"FM981",
     "TaskName":"Depl Fire 33",
     "Status":"Requested",
     "Priority":"Medium",
     "CreatedBy":"TestName7",
     "UpdatedOn":"11-10-2020 08:10 PM",
     "Comments":{
        "message":"File Upload Requested",
        "status":"Requested",
        "files":null
     }
  },
  {
     "FirewallID":"FFD1",
     "TaskName":"Task 44",
     "Status":"Requested",
     "Priority":"Critical",
     "CreatedBy":"TestName8",
     "UpdatedOn":"11-10-2020 06:25 PM",
     "Comments":{
        "message":"File Upload Requested",
        "status":"Requested",
        "files":null
     }
  },
  {
     "FirewallID":"FFD199",
     "TaskName":"Deloy 1",
     "Status":"In Progress",
     "Priority":"Low",
     "CreatedBy":"TestName1",
     "UpdatedOn":"11-10-2020 04:25",
     "Comments":{
        "message":"File Upload In Progress",
        "status":"In Progress",
        "files":null
     }
  },
  {
     "FirewallID":"FFD211",
     "TaskName":"Firewall 2",
     "Status":"Planned",
     "Priority":"High",
     "CreatedBy":"TestName2",
     "UpdatedOn":"11-10-2020 03:25",
     "Comments":{
        "message":"File Upoad Planned",
        "status":"Planned",
        "files":null
     }
  },
  {
     "FirewallID":"FM771",
     "TaskName":"Depl Fire 3",
     "Status":"Planned",
     "Priority":"Medium",
     "CreatedBy":"TestName3",
     "UpdatedOn":"11-10-2020 02:25",
     "Comments":{
        "message":"File Upoad Planned",
        "status":"Planned",
        "files":null
     }
  },
  {
     "FirewallID":"FU786",
     "TaskName":"Task 4",
     "Status":"Requested",
     "Priority":"Critical",
     "CreatedBy":"TestName4",
     "UpdatedOn":"11-10-2020 01:25",
     "Comments":{
        "message":"File Upload Requested",
        "status":"Requested",
        "files":null
     }
  },
  {
     "FirewallID":"FM231",
     "TaskName":"Deloy 12",
     "Status":"Planned",
     "Priority":"Low",
     "CreatedBy":"TestName5",
     "UpdatedOn":"10-10-2020 06:25",
     "Comments":{
        "message":"File Upload Planned",
        "status":"Planned",
        "files":null
     }
  },
  {
     "FirewallID":"FM982",
     "TaskName":"Firewall2 2",
     "Status":"Planned",
     "Priority":"High",
     "CreatedBy":"TestName6",
     "UpdatedOn":"10-10-2020 04:25",
     "Comments":{
        "message":"File Upload Planned",
        "status":"Planned",
        "files":null
     }
  },
  {
     "FirewallID":"FU561",
     "TaskName":"Depl Fire 33",
     "Status":"Requested",
     "Priority":"Medium",
     "CreatedBy":"TestName7",
     "UpdatedOn":"10-10-2020 02:25",
     "Comments":{
        "message":"File Upload Requested",
        "status":"Requested",
        "files":null
     }
  },
  {
     "FirewallID":"FFD111",
     "TaskName":"Task 44",
     "Status":"In Progress",
     "Priority":"Critical",
     "CreatedBy":"TestName8",
     "UpdatedOn":"10-10-2020 01:25",
     "Comments":{
        "message":"File Upoad In Progress",
        "status":"In Progress",
        "files":null
     }
  }
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
