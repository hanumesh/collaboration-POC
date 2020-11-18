import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import JSZip from 'jszip/dist/jszip';
import * as FileSaver from 'file-saver';
import { FirewallService } from '../services/firewall.service';

const URL = 'http://localhost:4200/fileupload/';

@Component({
  selector: 'app-automate-ideas',
  templateUrl: './automate-ideas.component.html',
  styleUrls: ['./automate-ideas.component.css']
})
export class AutomateIdeasComponent implements OnInit {
  
  baseUri: string = 'http://130.61.255.170:5000/saveNewAutomationIdea';

  isValid = false;
  showModal: boolean;
  registerForm: FormGroup;
  submitted = false;
  updatedOn: any = new Date();
  updatedOnValue: any;
  upLoadedDate: any = new Date();
  exceltoJson = {};
  file_data: any;
  automationData = {};

  // table declaration started
  tasksList: Observable<any[]>;

  selectedValue1 = '';
  selectedValue2 = '';
  selectedValue3 = '';
  defaultFirewallValue = '';

  dfPriorityDefaultValue = '';
  taskname = '';
  workInstructions = '';
  workInstructionsModel = '';
  upComingMonths = '';
  upComingMonthsModel = '';
  operatingProcess = '';
  operatingProcessModel = '';
  ShortDescription = '';

  defaultStatusArry: string[] = ["Requested", "Planned", "In Progress", "Under Review", "Complete"];
  defaultPriorityArry: string[] = ["Low", "Medium", "High", "Critical"];
  defaultCreatedByArry: string[] = ["TestName1", "TestName2", "TestName3", "TestName4"];

  // New Deploy Firewall declaration
  defaultNewStatusArry: string[] = ["Requested", "Planned", "In Progress", "Failed", "Complete"];
  workInstructionsArray: string[] = ["Yes", "No"];
  upComingMonthsArray: string[] = ["Yes", "No"];
  operatingProcessArray: string[] = ["Yes", "No"];
  defaultNewPriorityArry: string[] = ["Low", "Medium", "High", "Critical"];

  // Pagination parameters.
  p: number = 1;
  count: number = 5;
  // table declaration ended
  upLoadedDateFD: any = new Date();
  upLoadedDateFDToday: any;

  TaskName: any;

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private firewallService: FirewallService,
    private router: Router
  ) {
    this.upLoadedDateFDToday = formatDate(this.upLoadedDateFD, 'dd-MM-yyyy hh:mm a', 'en-US', '+0530');
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
      upComingMonths: [''],
      workInstructions: [''],
      operatingProcess: [''],
      priority: ['', Validators.required],
      shortDescription: ['', Validators.required],
      attachments: ['', Validators.required],
      updatedOn: [null, Validators.nullValidator]
    });
  }

  /* Select Dropdown error handling */
  public handleError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onDFSubmit() {
    //    this.exceltoJson = {};
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      // alert("Please fill mandatory fields in the Form")
      return;
    } else {
      this.updatedOnValue = formatDate(this.updatedOn, 'dd-MM-yyyy hh:mm a', 'en-US', '+0530');

      this.automationData = {
        "NewAutomationIdea": {
          "taskname": this.registerForm.value.taskname,
          "status": this.registerForm.value.status,
          "priority": this.registerForm.value.priority,
          "upComingMonths": this.registerForm.value.upComingMonths,
          "operatingProcess": this.registerForm.value.operatingProcess,
          "workInstructions": this.registerForm.value.workInstructions,
          "shortDescription": this.registerForm.value.shortDescription,
          "attachments": this.exceltoJson,
          "updatedOn": this.updatedOnValue
        }
      }

      console.log("automationData: " + JSON.stringify(this.automationData));

      this.http.post(this.baseUri , this.automationData).subscribe(
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
    if (ext.toLowerCase() == "xlsx" || ext.toLowerCase() == "xls") { } else {
      alert("Selected file format is not supported");
    }

    const target: DataTransfer = <DataTransfer>(event.target);
    const fileReader: FileReader = new FileReader();
    fileReader.readAsBinaryString(target.files[0]);
    fileReader.onload = (e: any) => {
      // create a workbook
      const binaryStr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binaryStr, { type: 'binary' });
      // alert("wb:"+"\n"+wb.SheetNames[0]+"\n"+wb.SheetNames[1]);
      // alert(wb.SheetNames.length);
      var roa = [];
      for (var i = 0; i < wb.SheetNames.length; i++) {
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
          var cell = ws[XLSX.utils.encode_cell({ c: C, r: R })];
          /* find the cell in the first row */
          var hdr = "UNKNOWN " + C; // <-- replace with your desired default
          if (cell && cell.t) {
            hdr = XLSX.utils.format_cell(cell);
          }
          headers.push(hdr);

        }
        // For each sheets, convert to json.
        //    var roa = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[i]]);
        roa = XLSX.utils.sheet_to_json(ws);
        // alert("roa length: "+roa.length);
        if (roa.length > 0) {
          //        alert("Inside if condition");
          for (var j = 0; j < roa.length; j++) {
            // Set empty cell to ''.
            for (var k = 0; k < headers.length; k++) {
              console.log((roa[j][headers[k]]));
              //s.replace(/[\n\r]/g, '');
              if (roa[j][headers[k]] == undefined) {
                roa[j][headers[k]] = "null";
              }
            }
          } // ended
        }

        this.file_data = wsname + "_data";
        this.exceltoJson[this.file_data] = roa;
        this.exceltoJson['UploadedOn'] = this.upLoadedDateFDToday;

        console.log("fina2: " + JSON.stringify(this.exceltoJson));
      }
    }
  } //file upload code Ended
  // ended

  clearText() {
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

  // Refresh Data table
  refreshDataTable($event) {
    console.log("Refresh data table button is clicked...!!!")
    alert("Refresh Table Data Development is In Progress...!!!");
    this.selectedValue1 = '';
    this.selectedValue2 = '';
    this.selectedValue3 = '';
    this.tasksList = this.firewallService.getAllFirewalls();
  }

  refreshDataTableDFNav($event) {
    console.log("Refresh data table Deploy Firewall Nav...!!!")
    //  alert("Refresh Table Data Development is In Progress...!!!");
    this.tasksList = this.firewallService.getAllFirewalls();
  }

  clearRegisterForm() {
    //this.registerForm.reset();
    this.taskname = '';
    this.ShortDescription = '';

    this.workInstructions = '';
    this.workInstructionsModel = '';

    this.upComingMonths = '';
    this.upComingMonthsModel = '';

    this.operatingProcess = '';
    this.operatingProcessModel = '';

    this.dfPriorityDefaultValue = '';
    this.uploader.clearQueue();
  }

  // Download button clicked
  downloadReport($event) {
    console.log("Download button is clicked...!!!")
    alert("Download Files Development is In Progress...!!!");
  }

  // Edit Firewall function
  editFirewall($event) {
    console.log("Edit Firewall is clicked...!!!")
    alert("Edit Firewall Development is In Progress...!!!");
  }

  exportAsTEXT(item) {
    alert("item");
    alert(item.Comments.message);
    let csvData3 = this.convertToText(item.Comments.files.output_file);
    let blob1 = new Blob(['\ufeff' + csvData3], { type: 'text/plain;charset=utf-8;' });

    let csvData4 = this.convertToText(item.Comments.files.log_file);
    let blob2 = new Blob(['\ufeff' + csvData4], { type: 'text/plain;charset=utf-8;' });

    var zip = new JSZip();
    zip.file("output_file.txt", blob1);
    zip.file("log_file.txt", blob2);
    zip.generateAsync({ type: "blob" }).then(function (content) {
      var dateStr = new Date();
      var formatedDateStr = formatDate(dateStr, 'dd-MM-yyyy', 'en-US');
      FileSaver.saveAs(content, item.FirewallID + "_" + formatedDateStr + ".zip");
    });
  }

  convertToText(objArray) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    for (let i = 0; i < array.length; i++) {
      str += array[i] + "\r\n";
    }
    return str;
  }
}
