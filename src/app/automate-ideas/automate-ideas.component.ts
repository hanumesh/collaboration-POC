import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {formatDate } from '@angular/common';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import JSZip from 'jszip/dist/jszip';
import * as FileSaver from 'file-saver';
import { FirewallService } from '../services/firewall.service';


const URL = 'http://localhost:4200/fileupload/';
const dfEndpointURL = "http://localhost:4000/deployfirewall/saveDeployFirewall";
const dmEndpointURL = "http://localhost:4000/deployfirewall/saveDeployMigration";
const duEndpointURL = "http://localhost:4000/deployfirewall/saveDeployUpgrade";


@Component({
  selector: 'app-automate-ideas',
  templateUrl: './automate-ideas.component.html',
  styleUrls: ['./automate-ideas.component.css']
})
export class AutomateIdeasComponent implements OnInit {

  isValid= false;
 showModal: boolean;
  registerForm: FormGroup;
  registerFMForm: FormGroup;
  registerFUForm: FormGroup;
     
  submitted = false;
  submittedFM = false;
  submittedFU = false;

  updatedOn: any = new Date();
  updatedOnValue: any;

  fmUpdatedOn: any = new Date();
  fmUpdatedValue: any;

  fuUpdatedOn: any = new Date();
  fuUpdatedOnValue: any;

  upLoadedDate: any = new Date();
  upLoadedDateFM: any = new Date();
  upLoadedDateFU: any = new Date();
  
  
  exceltoJson = {};
  attachmentsFMJson = {};
  attachmentsFUJson = {};

  file_data: any;
  fdData = {};
  fmData ={};
  fuData={};
  ffd: any;

  // table declaration started
  tasksList: Observable<any[]>;
  
  selectedValue1 = '';
  selectedValue2 = '';
  selectedValue3 = '';
  defaultFirewallValue = '';
  // Firewall Migration Default values
  fmPriorityDefaultValue='';
  fmSrcFirewallDefaultValue='';
  fmDestFirewallDefaultValue='';
  taskname2='';
  UserDetils2='';
  ShortDescription2='';

  taskname3='';
  UserDetils3='';
  ShortDescription3=''
  fuFirewallNameDefaultValue='';
  fuPriorityDefaultValue='';


  dfFNDefaultValue='';
  dfPriorityDefaultValue='';
  taskname1='';
  UserDetails1='';
  ShortDescription1='';


  defaultStatusArry: string[] = ["Requested", "Planned", "In Progress", "Failed", "Complete"];
  defaultPriorityArry: string[] = ["Low", "Medium", "High", "Critical"];
  defaultCreatedByArry: string[] = ["TestName1", "TestName2", "TestName3", "TestName4"];
  defaultFirewallNamesArry: string[] = ["Cisco", "Check Point", "Juniper", "Nokia", "Palo Alto"];

  // New Deploy Firewall declaration
  defaultNewStatusArry: string[] = ["Requested", "Planned", "In Progress", "Failed", "Complete"];
  defaultNewFWArry: string[] = ["Cisco", "Check Point", "Juniper", "Nokia", "Palo Alto"];
  defaultNewPriorityArry: string[] = ["Low", "Medium", "High", "Critical"];

  // Firewall Migration declaration
  defaultNewFMStatusArry: string[] = ["Requested", "Planned", "In Progress", "Failed", "Complete"];
  defaultSrcFMArry: string[] = ["Cisco", "Check Point", "Juniper", "Nokia", "Palo Alto"];
  defaultDstFMArry: string[] = ["Cisco", "Check Point", "Juniper", "Nokia", "Palo Alto"];
  defaultNewFMPriorityArry: string[] = ["Low", "Medium", "High", "Critical"];

    // Firewall Upgrade declaration
    defaultNewFUStatusArry: string[] = ["Requested", "Planned", "In Progress", "Failed", "Complete"];
    defaultNewFUFWArry: string[] = ["Cisco", "Check Point", "Juniper", "Nokia", "Palo Alto"];
    defaultNewFUPriorityArry: string[] = ["Low", "Medium", "High", "Critical"];
  
  // Pagination parameters.
  p: number = 1;
  count: number = 6;
  // table declaration ended
  upLoadedDateFD: any = new Date();
  upLoadedDateFDToday: any;

  upLoadedDateFM1: any = new Date();
  upLoadedDateFMToday: any;

  upLoadedDateFU1: any = new Date();
  upLoadedDateFUToday: any;

  TaskName:any;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private firewallService: FirewallService,
              private router: Router
            ) {

                this.upLoadedDateFDToday = formatDate(this.upLoadedDateFD, 'dd-MM-yyyy hh:mm a', 'en-US', '+0530');
                this.upLoadedDateFMToday = formatDate(this.upLoadedDateFM1, 'dd-MM-yyyy hh:mm a', 'en-US', '+0530');
                this.upLoadedDateFUToday = formatDate(this.upLoadedDateFU1, 'dd-MM-yyyy hh:mm a', 'en-US', '+0530');
                
                  //  this.tasksList = this.firewallService.getAllFirewalls();
  };

  show() {
    this.showModal = true; // Show-Hide Modal Check
  }
  //Bootstrap Modal Close event
  hide() {
    this.showModal = false;
  }
  ngOnInit() {

    this.refreshDataTableDFNav(1);
    
    this.registerForm = this.formBuilder.group({
      taskname: ['', [Validators.required, Validators.minLength(6)]],
      status: ['', [Validators.required]],
      userDetails: ['', Validators.required],
      firewallName: ['', [Validators.required]],
      priority: ['', Validators.required],
      shortDescription: ['', Validators.required],
      attachments: ['',Validators.required],
      updatedOn: [null, Validators.nullValidator]
    });

    this.registerFMForm = this.formBuilder.group({
      taskname: ['', [Validators.required, Validators.minLength(6)]],
      // status: ['', [Validators.required]],
      userDetails: ['', Validators.required],
      sourceFirewall: ['', [Validators.required]],
      destFirewall: ['', [Validators.required]],
      priority: ['', Validators.required],
      shortDescription: ['', Validators.required],
      attachments: ['',Validators.required],
      updatedOn: [null, Validators.nullValidator]
    },
    {
       validator: this.mustNotMatch('sourceFirewall', 'destFirewall')
  }
);

    this.registerFUForm = this.formBuilder.group({
      taskname: ['', [Validators.required, Validators.minLength(6)]],
      status: ['', [Validators.required]],
      userDetails: ['', Validators.required],
      firewallName: ['', [Validators.required]],
      priority: ['', Validators.required],
      shortDescription: ['', Validators.required],
      attachments: ['',Validators.required],
      updatedOn: [null, Validators.nullValidator]
    });
  }

 public mustNotMatch(sourceFirewall: string, destFirewall: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[sourceFirewall];
        const matchingControl = formGroup.controls[destFirewall];

        if (matchingControl.errors && !matchingControl.errors.mustNotMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value == matchingControl.value) {
          //  alert("control: "+control.value);
          //  alert("matchingControl: "+matchingControl.value);
       this.isValid =true;
           matchingControl.setErrors({ mustNotMatch: true });
        } else {
            matchingControl.setErrors(null);
            this.isValid =false;
        }
    }
}

  /* Select Dropdown error handling */
  public handleError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  public handleErrorFM = (controlName: string, errorName: string) => {
    return this.registerFMForm.controls[controlName].hasError(errorName);
  }

  public handleErrorFU = (controlName: string, errorName: string) => {
    return this.registerFUForm.controls[controlName].hasError(errorName);
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  get f1() { return this.registerFMForm.controls; }
  get f2() { return this.registerFUForm.controls; }  

  onDFSubmit() {
//    this.exceltoJson = {};
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      // alert("Please fill mandatory fields in the Form")
      return;
    }else {
//      alert("else part......");
      this.updatedOnValue =  formatDate(this.updatedOn, 'dd-MM-yyyy hh:mm a', 'en-US', '+0530');
/*
      let dfFormData: FormData = new FormData();
      dfFormData.append('taskname',this.registerForm.value.taskname);
      dfFormData.append('status',this.registerForm.value.status);
      dfFormData.append('firewallName',this.registerForm.value.firewallName);
      dfFormData.append('userDetails',this.registerForm.value.userDetails);
      dfFormData.append('priority',this.registerForm.value.priority);
      dfFormData.append('shortDescription',this.registerForm.value.shortDescription);
      dfFormData.append('attachments', this.registerForm.value.attachments);
      dfFormData.append('updatedOn',this.updatedOnValue);

      console.log("taskname: "+dfFormData.get("taskname"));
      console.log("status: "+dfFormData.get("status"));
      console.log("firewallName: "+dfFormData.get("firewallName"));
      console.log("userDetails: "+dfFormData.get("userDetails"));
      console.log("priority: "+dfFormData.get("priority"));
      console.log("shortDescription: "+dfFormData.get("shortDescription"));
      console.log("attachments: "+JSON.stringify(this.exceltoJson));
      console.log("updatedOn: "+dfFormData.get("updatedOn"));
*/
      // this.ffd= this.exceltoJson;
      this.fdData =  {
        "FFD":{
            "taskname":this.registerForm.value.taskname,
            "status": this.registerForm.value.status,
             "firewallName":this.registerForm.value.firewallName,
             "userDetails": this.registerForm.value.userDetails,
             "priority": this.registerForm.value.priority,
            "shortDescription": this.registerForm.value.shortDescription,
             "attachments":this.exceltoJson,
             "updatedOn": this.updatedOnValue
            }
        }
        
        console.log("fdData: "+JSON.stringify(this.fdData));
      
      this.http.post('dfEndpointURL', this.fdData).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      )
    }
}

  // file upload code Started
  public uploader: FileUploader = new FileUploader({
    url: URL,
    disableMultipart: false,
    autoUpload: true,
    method: 'post',
    itemAlias: 'attachment',
    allowedFileType: ['xls'],
    queueLimit: 1    
  });

// started
public onFileSelected(event: any) {
  this.upLoadedDate = this.upLoadedDateFDToday;
  this.exceltoJson = {};

  const files: File = event.target.files;
  // alert("Files: "+files[0].name);
  // var name = files[0].name;
  var ext = files[0].name.substring(files[0].name.lastIndexOf('.') + 1);
  // alert("ext: "+ext);
  if (ext.toLowerCase() == "xlsx" || ext.toLowerCase() == "xls" )
   { }else{
    alert("Selected file format is not supported");
  }

  const target: DataTransfer = <DataTransfer>(event.target);
  const fileReader: FileReader = new FileReader();
  fileReader.readAsBinaryString(target.files[0]);
  fileReader.onload = (e: any) => {
  // create a workbook
    const binaryStr: string = e.target.result;
    const wb: XLSX.WorkBook = XLSX.read(binaryStr,{type: 'binary'});
    // alert("wb:"+"\n"+wb.SheetNames[0]+"\n"+wb.SheetNames[1]);
    // alert(wb.SheetNames.length);
    var roa = [];
    for( var i=0; i < wb.SheetNames.length;i++){
        // Get headers.
        var headers = [];
        
      //  var sheet = wb.Sheets[wb.SheetNames[i]];
      const wsname: string = wb.SheetNames[i];
      // alert("wsname: "+wsname);
    const ws: XLSX.WorkSheet = wb.Sheets[wsname]
      //  var range = XLSX.utils.decode_range(sheet['!ref']);
    var range = XLSX.utils.decode_range(ws['!ref']);
        var C, R = range.s.r;
        /* start in the first row */
        /* walk every column in the range */
        for (C = range.s.c; C <= range.e.c; ++C) {
       //     var cell = sheet[XLSX.utils.encode_cell({c: C, r: R})];
        var cell = ws[XLSX.utils.encode_cell({c: C, r: R})];
            /* find the cell in the first row */
            var hdr = "UNKNOWN " + C; // <-- replace with your desired default
            if (cell && cell.t) {
                hdr = XLSX.utils.format_cell(cell);
            }
            headers.push(hdr);
            
        }
      //    alert("header value: "+headers[0]+"\n"+headers[1]+"\n"+headers[2]+"\n"+headers[3]+"\n"+headers[4]+"\n");
           // For each sheets, convert to json.
       //    var roa = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[i]]);
        roa = XLSX.utils.sheet_to_json(ws);
      // alert("roa length: "+roa.length);
           if (roa.length > 0) {
     //        alert("Inside if condition");
             for(var j=0; j<roa.length;j++){
                // Set empty cell to ''.
                for(var k=0;k< headers.length;k++){
                  console.log((roa[j][headers[k]]));
                  //s.replace(/[\n\r]/g, '');
                   if (roa[j][headers[k]] == undefined) {
                    roa[j][headers[k]] = "null";
                } 
              }
          } // ended
    }
   //  console.log("roa: "+JSON.stringify(roa));
   //  alert("roa: "+(JSON.stringify(roa)));
    this.file_data = wsname+"_data";
    this.exceltoJson[this.file_data] = roa;    
    this.exceltoJson['UploadedOn'] = this.upLoadedDateFDToday;
    
      console.log("fina2: "+JSON.stringify(this.exceltoJson));
    }
  }
} //file upload code Ended
// ended

clearText(){
    this.TaskName = null;
}

changeStatus(e) {
    this.registerForm.get('status').setValue(e.target.value, {
      onlySelf: true
    })
}

changeFWName(e) {
  this.registerForm.get('firewallName').setValue(e.target.value, {
    onlySelf: true
  })
}

changePriority(e) {
  this.registerForm.get('priority').setValue(e.target.value, {
    onlySelf: true
  })
}

// Firewall Migration submit event
  onFMSubmit() {
    this.submittedFM = true;
    // console.log("submittedFM: "+this.registerFMForm.value);
    // stop here if form is invalid
    if (this.registerFMForm.invalid) {
      return;
    }else {
     /* alert("else part......");
      let fmFormData: FormData = new FormData();
      fmFormData.append('taskname',this.registerFMForm.value.taskname);
      fmFormData.append('status',this.registerFMForm.value.status);
      fmFormData.append('sourceFirewall',this.registerFMForm.value.sourceFirewall);
      fmFormData.append('destFirewall',this.registerFMForm.value.destFirewall);
      fmFormData.append('userDetails',this.registerFMForm.value.userDetails);
      fmFormData.append('priority',this.registerFMForm.value.priority);
      fmFormData.append('shortDescription',this.registerFMForm.value.shortDescription);
      fmFormData.append('attachments', this.registerFMForm.value.attachments);
      fmFormData.append('updatedOn',this.fmUpdatedOn)
    
      console.log("taskname: "+fmFormData.get("taskname"));
      console.log("status: "+fmFormData.get("status"));
      console.log("sourceFirewall: "+fmFormData.get("sourceFirewall"));
      console.log("destFirewall: "+fmFormData.get("destFirewall"));
      console.log("userDetails: "+fmFormData.get("userDetails"));
      console.log("priority: "+fmFormData.get("priority"));
      console.log("shortDescription: "+fmFormData.get("shortDescription"));
      console.log("attachments: "+fmFormData.get("attachments"));
      console.log("updatedOn: "+this.fmUpdatedOn);
*/

this.fmUpdatedValue =  formatDate(this.fmUpdatedOn, 'dd-MM-yyyy hh:mm a', 'en-US', '+0530');

this.fmData =  {
  "FM":{
      "taskname":this.registerFMForm.value.taskname,
      "status": this.registerFMForm.value.status,
       "sourceFirewall":this.registerFMForm.value.sourceFirewall,
       "destFirewall":this.registerFMForm.value.destFirewall,
       "userDetails": this.registerFMForm.value.userDetails,
       "priority": this.registerFMForm.value.priority,
      "shortDescription": this.registerFMForm.value.shortDescription,
       "attachments":this.attachmentsFMJson,
       "updatedOn": this.fmUpdatedValue
      }
  }
  console.log("fmData: "+JSON.stringify(this.fmData));

      this.http.post(dmEndpointURL, this.fmData).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      ) 
    }
  }

 // Firewall Migration Status event
  changeFMStatus(e) {
    this.registerFMForm.get('status').setValue(e.target.value, {
      onlySelf: true
    })
  }

  // Firewall Migration SrcFirewall event
  changeFMSourceFirewall(e) {
    this.registerFMForm.get('sourceFirewall').setValue(e.target.value, {
      onlySelf: true
    })
  }

   // Destination Firewall event
   changeFMDestFirewall(e) {
    this.registerFMForm.get('destFirewall').setValue(e.target.value, {
      onlySelf: true
    })
  }

  // Firewall Migration priority event
  changeFMPriority(e) {
    this.registerFMForm.get('priority').setValue(e.target.value, {
      onlySelf: true
    })
  }

    // Firewall Migration file upload code Started
    public fmUploader: FileUploader = new FileUploader({
      url: URL,
      disableMultipart: false,
      autoUpload: true,
      method: 'post',
      itemAlias: 'attachment',
      allowedFileType: ['xls'],
      queueLimit: 1  
    });
  
    public onFileSelectedFM(event: any) {
      this.upLoadedDateFM1 = this.upLoadedDateFMToday;
      this.attachmentsFMJson = {};
      const files: File = event.target.files;
      // alert("Files: "+files[0].name);
      // var name = files[0].name;
      var ext = files[0].name.substring(files[0].name.lastIndexOf('.') + 1);
      // alert("ext: "+ext);
      if (ext.toLowerCase() == "xlsx" || ext.toLowerCase() == "xls" )
       { }else{
        alert("Selected file format is not supported");
      }

const target: DataTransfer = <DataTransfer>(event.target);
const fileReader: FileReader = new FileReader();
fileReader.readAsBinaryString(target.files[0]);
// this.file_data = "filecontent_"+target.files[0].name;
fileReader.onload = (e: any) => {
  // create a workbook
  const binaryStr: string = e.target.result;
  const wb: XLSX.WorkBook = XLSX.read(binaryStr,{type: 'binary'});
  var roaFM = [];
  
      for( var i=0; i < wb.SheetNames.length;i++){
        // Get headers.
        var headers = [];
        
      const wsname: string = wb.SheetNames[i];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname]
    var range = XLSX.utils.decode_range(ws['!ref']);
        var C, R = range.s.r;
        /* start in the first row */
        /* walk every column in the range */
        for (C = range.s.c; C <= range.e.c; ++C) {
       //     var cell = sheet[XLSX.utils.encode_cell({c: C, r: R})];
        var cell = ws[XLSX.utils.encode_cell({c: C, r: R})];
            /* find the cell in the first row */
            var hdr = "UNKNOWN " + C; // <-- replace with your desired default
            if (cell && cell.t) {
                hdr = XLSX.utils.format_cell(cell);
            }
            headers.push(hdr);
            
        }
      //    alert("header value: "+headers[0]+"\n"+headers[1]+"\n"+headers[2]+"\n"+headers[3]+"\n"+headers[4]+"\n");
           // For each sheets, convert to json.
        roaFM = XLSX.utils.sheet_to_json(ws);
           if (roaFM.length > 0) {
     //        alert("Inside if condition");
             for(var j=0; j<roaFM.length;j++){
                // Set empty cell to ''.
                for(var k=0;k< headers.length;k++){
                  console.log((roaFM[j][headers[k]]));
                   if (roaFM[j][headers[k]] == undefined) {
                    roaFM[j][headers[k]] = "null";
                } 
              }
          } // ended
    }
    this.file_data = wsname+"_data";
    this.attachmentsFMJson[this.file_data] = roaFM;    
    this.attachmentsFMJson['UploadedOn'] = this.upLoadedDateFMToday;
    
      console.log("fina2: "+JSON.stringify(this.attachmentsFMJson));
    }

  /*for( var i=0; i < wb.SheetNames.length;i++){
    console.log("excelsheet: "+(wb.SheetNames[i]));
    const wsname: string = wb.SheetNames[i];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname]
    const data = XLSX.utils.sheet_to_json(ws);
    this.file_data = target.files[0].name+"_"+wsname+"_data";
    this.attachmentsFMJson[this.file_data] = data;
  }
  this.attachmentsFMJson['UploadedOn'] = this.upLoadedDateFMToday;
  console.log("final: "+JSON.stringify(this.attachmentsFMJson));
  */
}

/*this.fmUploader.onAfterAddingFile = (item) => {
        alert("1");
        item.remove();
 if (this.fmUploader.queue.filter(f => f._file.type == item._file.name).length == 0) {
          alert("2"+ this.fmUploader.queue.length);
          this.fmUploader.queue.push(item);
        } else {
          alert("3");
          alert("file duplicated");
        }
}; */
  } //Firewall Migration fileUpload code Ended  

// Firewall Upgrade submit event
    onFUSubmit() {
      this.submittedFU = true;
      // console.log(this.registerFUForm.value);
      // stop here if form is invalid
      if (this.registerFUForm.invalid) {
        // alert("Please fill mandatory fields in the Form")
        return;
      }else {
/*        alert("else part......")
        let fuFormData: FormData = new FormData();
        fuFormData.append('taskname',this.registerFUForm.value.taskname);
        fuFormData.append('status',this.registerFUForm.value.status);
        fuFormData.append('firewallName',this.registerFUForm.value.firewallName);
        fuFormData.append('userDetails',this.registerFUForm.value.userDetails);
        fuFormData.append('priority',this.registerFUForm.value.priority);
        fuFormData.append('shortDescription',this.registerFUForm.value.shortDescription);
        fuFormData.append('attachments', this.registerFUForm.value.attachments);
        fuFormData.append('updatedOn',this.fuUpdatedOn);

        console.log("taskname: "+fuFormData.get("taskname"));
        console.log("status: "+fuFormData.get("status"));
        console.log("firewallName: "+fuFormData.get("firewallName"));
        console.log("userDetails: "+fuFormData.get("userDetails"));
        console.log("priority: "+fuFormData.get("priority"));
        console.log("shortDescription: "+fuFormData.get("shortDescription"));
        console.log("attachments: "+fuFormData.get("attachments"));
        console.log("updatedOn: "+this.fuUpdatedOn); */

        this.fuUpdatedOnValue =  formatDate(this.fuUpdatedOn, 'dd-MM-yyyy hh:mm a', 'en-US', '+0530');
        this.fuData =  {
          "FU":{
              "taskname":this.registerFUForm.value.taskname,
              "status": this.registerFUForm.value.status,
               "firewallName":this.registerFUForm.value.firewallName,
               "userDetails": this.registerFUForm.value.userDetails,
               "priority": this.registerFUForm.value.priority,
              "shortDescription": this.registerFUForm.value.shortDescription,
               "attachments":this.attachmentsFUJson,
               "updatedOn": this.fuUpdatedOnValue
              }
          }
          
          console.log("fuData: "+JSON.stringify(this.fuData));
  
        this.http.post(duEndpointURL, this.fuData).subscribe(
          (response) => console.log(response),
          (error) => console.log(error)
        )
      }
    }

// Firewall Upgrade Status event
  changeFUStatus(e) {
    this.registerFUForm.get('status').setValue(e.target.value, {
      onlySelf: true
    })
  }

// Firewall Upgrade 'firewallName' event
  changeFUFWName(e) {
    this.registerFUForm.get('firewallName').setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeFUPriority(e) {
    this.registerFUForm.get('priority').setValue(e.target.value, {
      onlySelf: true
    })
  }

    // Firewall Migration file upload code Started
        public fuUploader: FileUploader = new FileUploader({
          url: URL,
          disableMultipart: false,
          autoUpload: true,
          method: 'post',
          itemAlias: 'attachment',
          allowedFileType: ['xls'],
          queueLimit: 1  
        });
      
        public onFileSelectedFU(event: any) {
          // const file: File = event[0];
          this.upLoadedDateFU1 = this.upLoadedDateFUToday;
          this.attachmentsFUJson = {};
          const files: File = event.target.files;
          // alert("Files: "+files[0].name);
          // var name = files[0].name;
          var ext = files[0].name.substring(files[0].name.lastIndexOf('.') + 1);
          // alert("ext: "+ext);
          if (ext.toLowerCase() == "xlsx" || ext.toLowerCase() == "xls" )
           {
          }else{
            alert("Selected file format is not supported");
          }

          const target: DataTransfer = <DataTransfer>(event.target);
          const fileReader: FileReader = new FileReader();
          fileReader.readAsBinaryString(target.files[0]);
          fileReader.onload = (e: any) => {
            // create a workbook
              const binaryStr: string = e.target.result;
              const wb: XLSX.WorkBook = XLSX.read(binaryStr,{type: 'binary'});
              // alert("wb:"+"\n"+wb.SheetNames[0]+"\n"+wb.SheetNames[1]);
              // alert(wb.SheetNames.length);
              var roaFU = [];
              for( var i=0; i < wb.SheetNames.length;i++){
                  // Get headers.
                  var headers = [];
                  
                const wsname: string = wb.SheetNames[i];
              const ws: XLSX.WorkSheet = wb.Sheets[wsname]
              var range = XLSX.utils.decode_range(ws['!ref']);
                  var C, R = range.s.r;
                  /* start in the first row */
                  /* walk every column in the range */
                  for (C = range.s.c; C <= range.e.c; ++C) {
                  var cell = ws[XLSX.utils.encode_cell({c: C, r: R})];
                      /* find the cell in the first row */
                      var hdr = "UNKNOWN " + C; // <-- replace with your desired default
                      if (cell && cell.t) {
                          hdr = XLSX.utils.format_cell(cell);
                      }
                      headers.push(hdr);
                      
                  }
                     // For each sheets, convert to json.
                  roaFU = XLSX.utils.sheet_to_json(ws);
                     if (roaFU.length > 0) {
                       for(var j=0; j<roaFU.length;j++){
                          // Set empty cell to ''.
                          for(var k=0;k< headers.length;k++){
                            if (roaFU[j][headers[k]] == undefined) {
                              roaFU[j][headers[k]] = "null";
                          } 
                        }
                    } // ended
              }
              this.file_data = wsname+"_data";
              this.attachmentsFUJson[this.file_data] = roaFU;    
              this.attachmentsFUJson['UploadedOn'] = this.upLoadedDateFUToday;
                console.log("fina2: "+JSON.stringify(this.attachmentsFUJson));
              }
            }
    /*      fileReader.onload = (e: any) => {
            // create a workbook
            const binaryStr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(binaryStr,{type: 'binary'});
            
            for( var i=0; i < wb.SheetNames.length;i++){
              console.log("excelsheet: "+(wb.SheetNames[i]));
              const wsname: string = wb.SheetNames[i];
              const ws: XLSX.WorkSheet = wb.Sheets[wsname]
              const data = XLSX.utils.sheet_to_json(ws);
              this.file_data = target.files[0].name+"_"+wsname+"_data";
              this.attachmentsFUJson[this.file_data] = data;
            }
            this.attachmentsFUJson['UploadedOn'] = this.upLoadedDateFUToday;
            console.log("final: "+JSON.stringify(this.attachmentsFUJson));
            
          }  */
      

       /*   this.fuUploader.onAfterAddingFile = (item) => {
            alert("1");
            item.remove();
            if (this.fuUploader.queue.filter(f => f._file.name == item._file.name).length == 0) {
              alert("2");
              this.fuUploader.queue.push(item);
            } else {
              alert("3");
              alert("file duplicated");
            }
          }; */
        } //Firewall Migration fileUpload code Ended

   // Refresh Data table
   refreshDataTable($event){
     console.log("Refresh data table button is clicked...!!!")
    alert("Refresh Table Data Development is In Progress...!!!");
    this.selectedValue1 = '';
    this.selectedValue2 = '';
    this.selectedValue3 = '';
   this.tasksList = this.firewallService.getAllFirewalls();
   }

   refreshDataTableDFNav($event){
  console.log("Refresh data table Deploy Firewall Nav...!!!")
  //  alert("Refresh Table Data Development is In Progress...!!!");
    this.tasksList = this.firewallService.getAllFirewalls();
  }

  // close popup window 
  clearFMFormData(){
  //this.registerFMForm.reset();
  this.fmPriorityDefaultValue='';
  this.fmSrcFirewallDefaultValue='';
  this.fmDestFirewallDefaultValue='';
  this.taskname2='';
  this.UserDetils2='';
  this.ShortDescription2=''
   this.fmUploader.clearQueue();
  }

  clearRegisterForm(){
  //this.registerForm.reset();
  this.taskname1='';
  this.UserDetails1='';
  this.ShortDescription1='';
  this.dfFNDefaultValue='';
  this.dfPriorityDefaultValue='';
  this.uploader.clearQueue();
  }

  clearFUFormData(){
    
  this.taskname3='';
  this.UserDetils3='';
  this.ShortDescription3=''
  // this.registerFUForm.reset();
  this.fuPriorityDefaultValue='';
  this.fuFirewallNameDefaultValue='';
  this.fuUploader.clearQueue();
  }

   // Download button clicked
   downloadReport($event){
    console.log("Download button is clicked...!!!")
    alert("Download Files Development is In Progress...!!!");
   }
   
   // Edit Firewall function
   editFirewall($event){
    console.log("Edit Firewall is clicked...!!!")
    alert("Edit Firewall Development is In Progress...!!!");
   }

   exportAsTEXT(item){
     alert("item");
     alert(item.Comments.message);
     let csvData3 = this.convertToText(item.Comments.files.output_file);
     let blob1 = new Blob(['\ufeff' + csvData3], { type: 'text/plain;charset=utf-8;' });
     
     let csvData4 = this.convertToText(item.Comments.files.log_file);
     let blob2 = new Blob(['\ufeff' + csvData4], { type: 'text/plain;charset=utf-8;' });

     var zip = new JSZip();
     zip.file("output_file.txt", blob1);
     zip.file("log_file.txt",blob2);
     zip.generateAsync({ type: "blob" }).then(function (content) {
       var dateStr = new Date();
       var formatedDateStr =  formatDate(dateStr, 'dd-MM-yyyy', 'en-US');
      FileSaver.saveAs(content, item.FirewallID+"_"+formatedDateStr+".zip");
    });     
   }

   convertToText(objArray) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    for (let i = 0; i < array.length; i++) {
      str += array[i]+"\r\n";
    }
    return str;
   }
}
