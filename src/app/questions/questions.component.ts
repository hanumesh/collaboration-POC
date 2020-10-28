import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  constructor() { }
  selectedValue1 = '';
  selectedValue2 = '';
  selectedValue3 = '';
  selectedValue4 = '';
  selectedValue5 = '';
  selectedValue6 = '';
  selectedValue7 = '';
  selectedValue8 = '';
  selectedValue9 = '';
  selectedValue10 = '';
  selectedValue11 = '';
  selectedValue12 = '';
  selectedValue13 = '';


  ProjClassifyArry: string[] = ["Embedded", "Desktop Application", "Web Application", "Mobile Application", "Cloud based Application", "Mechanical"];
  ActivityListArray: string[] = ["Requirement", "Design", "Design Computer Aided Engineering", "Design Computer Aided Design", "Implementation Coding,", "System Integration & Validation", "SIV Test case development", "SIV Test cases execution", "E2E Pipeline", "Deployment", "Maintainance Support", "Process Operations"];
  RequirementArray: string[] = ["Requirement Elicitation", "Requirement Analyis"];
  DesignArray: string[] = ["Architecture Design", "Software Design"];
  DesignAidedArray: string[] = ["CAE Requirement Analysis --Transform the part of the system requirements into a set of CAE requirements", "Pre-processing --Upload of CAD model, defining the model and environmental factors", "Solving --Solve the model using an appropriate mathematical formulation of the underlying physics", "Post-processing --Validation of the model and 3D visualization"];
  DesignComputerAidedArray: string[] = ["3D Modelling --Process of developing a mathematical representation like surfaces or Solids using pre defined geometries and Power copies.", "2D Drawing --Creating a 2D view on a drawing format.", "Feature Creation --Process involved in creation some geometric and topological properties on 3D Model part (Plastic, Sheet metal, etc..). ", "Design Layout templates & Checklists--Process  which define the way in which we arrange the requirements and elements  which makeup the content of a design. ", "User Interface creation--Creation of Start-up 3D and 2D models, Tool bar Customization.", "Marco development--Developing Macro's for most common repetitive task used in 3D model and 2 Drawing. Marco's can be developed using VB script, C/C++, Catia ib built", "CAD/Engnieering Documentation--Document creation related to Engineering BOM, Manufacturing BOM, Translation Formats (.igs, .step), Report generation templates (DMU, Die draw analysis, etc), Quality check reports"];
  Implementation_CodingArray: string[] = ["Auto code generation", "Static code analysis","Unit Testing"];
  SIV_DevArray: string[] = ["Standard framework for TC development","Resue of basic building blocks to reduce TC writing effort","Reuse of test case (e.g. standards cases like testing of 3GPP standards protocol )"];
  SIV_executionArray: string[] = ["Regression/Sanity Testing","System/Functional Testing","Load and Performance Testing","Security Testing","Dynamic code analysis","Report generation","Notification","Bug creation"];
  E2E_PipelineArray: string[] = ["Agile Way of Working","Test driven Development","Devops ( CI/CD)","E2E: Pipeline ( Requirments to Preproduction)"];
  Deployment_Array: string[] = ["Deployment on pre-prod","Deployment on prod","continous monitoring"];
  Maintain_supportArray: string[] = ["Automated ticket creation from mail etc","Automatic ticket assignment","Duplicate issue detection","Automated SLA Tracking  & Notification","Knowledge base for support"];
  Process_OpArray: string[] = ["Purchase to Pay Process","Record to recipt process","Asset Management","Change Management","Demand Management","Backup and Recovery","Request Fulfilment","Reporting and Dashboarding","Monitoring and anamoly detection"];
  ngOnInit() {
  }

}
