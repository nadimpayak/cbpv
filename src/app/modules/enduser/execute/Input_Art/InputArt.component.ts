import { MatTableDataSource } from '@angular/material';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { StorageSessionService } from '../../../../service/storage-session.service';
import { Globals } from '../../../../service/globals';
import { ReportData, ScopeLimiting } from './Classes';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-art',
  templateUrl: './Input_Art.component.html',
  styleUrls: ['./Input_Art.component.scss'],
})

export class InputArtComponent {
  private dataSource1 = new MatTableDataSource();
  private reportData: ReportData;
  private scope: ScopeLimiting = new ScopeLimiting();
  private domain_name = this.globals.domain_name;;
  private apiUrlGet = 'https://' + this.domain_name + '/rest/E_DB/SP?';
  allFiles = [];
  sizes = [];
  size
  fileName: string
  selectedFiles: any[] = [];
  Execute_res_data
  agencyName: string;
  application: string;
  process: string;
  service: string;
  form: FormGroup;
  tempale
  modalRef: BsModalRef;
  closeResult: string;
  // accepType;
  // @ override
  //public filesUrl: FileUrls;

  constructor(private storage: StorageSessionService,
    private http: HttpClient,
    public globals: Globals,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    public router: Router,
    private _location: Location,
    private StorageSessionService: StorageSessionService, ) {
    //this.filesUrl = new FileUrls(this.storage);
    this.reportData = new ReportData(this.storage);
    console.log('---------------');
    console.log(this.reportData.getProcess());
    console.log("abdalla Report", this.globals.Report)
    this.agencyName = this.reportData.getAgency();
    this.application = this.reportData.getProcess();
    this.process = this.reportData.getApplication();
    this.service = this.reportData.getService();
    this.form = this.formBuilder.group({
      description: ['', Validators.required],
    });
    this.Execute_res_data = this.StorageSessionService.getCookies('executeresdata');
    this.globals.Report.PVP = JSON.parse(this.globals.Report.PVP)
    this.oldfiles();
  }

  /*
  Get all old files that are exist in system on server
  */
  oldfiles() {
    // this.filesdata = {};
    // this.fd = [];
    this.allFiles = []
    // this.http.get<allFiles>(this.apiUrlGet + 'V_SRVC_CD=' + this.reportData.getService() + '&V_APP_CD=' +
    //   this.reportData.getApplication() + '&V_PRCS_CD=' + this.reportData.getProcess() +
    //   '&V_SRC_CD=' + this.reportData.getAgency() + '&REST_Service=Artifacts&Verb=GET' + '&V_USR_NM=' + this.globals.Report.USR_NM[0]).subscribe(
    //     res => {
    //       console.log("res", res);
    //       for (let i = 0; i < res.ARTFCT_NM.length; i++) {
    //         let obj = {}
    //         for (const key in res) {
    //           if (res.hasOwnProperty(key)) {
    //             obj[key] = res[key][i]

    //           }
    //         }
    //         this.allFiles.push(obj)
    //       }
    //       console.log("allFiles", this.allFiles);
    //     });


    if (this.globals.Report.ARTFCT_NM[0]) {
      let ARTFCT_NM = this.globals.Report.ARTFCT_NM[0].split(',')
      let ART_DSC = this.globals.Report.ART_DSC[0].split(',')
      let ART_SIZE_MB = this.globals.Report.ART_SIZE_MB[0].split(',')
      let DELETE = this.globals.Report.DELETE[0].split(',')
      let LST_UPDT_DT_TM = this.globals.Report.LST_UPDT_DT_TM[0].split(',')
      let EXECUTE = this.globals.Report.EXECUTE[0].split(',')
      let ARTFCT_ID = this.globals.Report.ARTFCT_ID[0].split(',')
      for (let i = 0; i < ARTFCT_NM.length; i++) {
        let body = {}
        body = {
          ARTFCT_NM: !i ? ARTFCT_NM[i].substring(1, ARTFCT_NM[i].length - 1) : ARTFCT_NM[i].substring(2, ARTFCT_NM[i].length - 1),
          ART_DSC: !i ? ART_DSC[i].substring(1, ART_DSC[i].length - 1) : ART_DSC[i].substring(2, ART_DSC[i].length - 1),
          ART_SIZE_MB: !i ? ART_SIZE_MB[i].substring(1, ART_SIZE_MB[i].length - 1) : ART_SIZE_MB[i].substring(2, ART_SIZE_MB[i].length - 1),
          LST_UPDT_DT_TM: !i ? LST_UPDT_DT_TM[i].slice(1, 11) : LST_UPDT_DT_TM[i].slice(2, 12),
          DELETE: DELETE[i],
          EXECUTE: EXECUTE[i],
          ARTFCT_ID: !i ? ARTFCT_ID[i].substring(1, ARTFCT_ID[i].length - 1) : ARTFCT_ID[i].substring(2, ARTFCT_ID[i].length - 1),
        }
        this.allFiles.push(body)
      }
    }
    console.log("allFiles", this.allFiles)
  }

  fileChangeEvent(event: any, file: any) {

    //Get File Size
    let size: any = 0
    size = event.target.files[0].size / (1024 * 1024) * 100;
    size = Math.round(size) / 100;
    size = size.toFixed(2);
    this.size = size
    console.log('Size: ' + size + " MB");

    // this.allFiles = [];
    const fileList: FileList = event.target.files;
    const selectedFile = <File>event.target.files[0];
    //  this.fileName = selectedFile.name;
    //  this.fileType = selectedFile.type;
    const formData: FormData = new FormData();
    const files: any = { "File_Path": this.globals.Report.PVP.PHY_LCTN[0] };
    //files['File_Path'] = this.filesUrl.getFileUrl();
    files['File_Name'] = selectedFile.name;
    this.fileName = selectedFile.name;
    while (this.fileName.includes(',')) {
      this.fileName = this.fileName.replace(',', '');
    }
    console.log("fileName", this.fileName, this.fileName.length)
    if (!(this.fileName.length - 5)) {
      alert("fileName Should has No coma!")
      return
    }
    formData.append('Source_File', selectedFile);
    formData.append('FileInfo', JSON.stringify(files));
    const obj = this.http.post('https://enablement.us/FileAPIs/api/file/v1/upload', formData).subscribe(
      res => {
        console.log(res);
        this.openModal(this.tempale)
        // this.oldfiles();
      }
    );

  }

  add_file() {
    let body: any = {
      "V_ARTFCT_NM": [this.fileName],
      "V_ARTFCT_TYP": this.globals.Report.ARTFCT_TYP,
      "V_ART_DSC": [this.form.value.description],
      "V_ART_SIZE_MB": [this.size],
      "V_SRC_CD": this.globals.Report.SRC_CD,
      "V_CXN_CD": null,
      "V_PHY_LCTN": this.globals.Report.PVP.PHY_LCTN,
      "V_USR_GRP_ID": this.globals.Report.USR_GRP_ID,
      "V_USR_NM": this.globals.Report.USR_NM,
      "V_APP_CD": this.globals.Report.APP_CD,
      "V_PRCS_CD": this.globals.Report.PRCS_CD,
      "V_SRVC_CD": this.globals.Report.SRVC_CD,
      "V_LCK": [""],
      "REST_Service": ["Artifacts"],
      "Verb": "POST",
      "LST_UPDT_DT_TM": new Date().toISOString().slice(0, 10)
    };
    console.log(body);
    this.http.post("https://" + this.domain_name + "/rest/E_DB/SP", body).subscribe(
      res => {
        console.log(res);
        body = {
          ...body, ...res,
          ARTFCT_NM: this.fileName,
          ART_DSC: this.form.value.description,
          ART_SIZE_MB: this.size,
          LST_UPDT_DT_TM: new Date().toISOString().slice(0, 10),
          DELETE: 'Y',
          EXECUTE: 'Y',
        }
        // for (const key in body) {
        //   if (body.hasOwnProperty(key)) {
        //     console.log(body[key], Array.isArray(body[key]))
        //     if (Array.isArray(body[key])) body[key] = body[key][0]
        //   }
        // } 
        this.modalService.hide(1);
        this.allFiles.push(body)
        console.log("allFiles", this.allFiles)
        // this.oldfiles();
      });
  }

  uploadBtnClick(template: TemplateRef<any>) {
    document.getElementById('Document_File').click();
    this.tempale = template

  }

  selectFiles(fileId) {
    // fileId = fileId.substring(1, fileId.length-1); 
    console.log("selectedFiles", fileId)
    if (!this.selectedFiles.includes(fileId))
      this.selectedFiles.push(fileId)
    else
      this.selectedFiles.splice(this.selectedFiles.indexOf(fileId), 1)
    console.log("selectedFiles", this.selectedFiles)
  }

  submitbtn_click() {
    console.log("selectedFiles", this.selectedFiles)
    let files = this.allFiles.filter(file => this.selectedFiles.includes(file.ARTFCT_ID))
    let fileNames = files.map(file => this.globals.Report.PVP.PHY_LCTN + file.ARTFCT_NM)
    console.log('fileNames', this.allFiles, this.selectedFiles, fileNames);
    let body = {
      "V_USR_NM": this.globals.Report.USR_NM[0],
      "V_EXE_CD": this.globals.Report.EXE_CD[0],
      "V_PRCS_TXN_ID": this.Execute_res_data['V_PRCS_TXN_ID'],
      "V_APP_ID": this.Execute_res_data['V_APP_ID'],
      "V_PRCS_ID": this.Execute_res_data['V_PRCS_ID'],
      "V_SRC_ID": this.Execute_res_data['V_SRC_ID'],
      "V_SRVC_ID": this.globals.Report.SRVC_ID[0],
      "V_PVP": JSON.stringify({
        "PHY_LCTN_FILE": [...fileNames]
      }),
      "V_RELEASE_RSN": "Submitted manual input",
      "V_OPERATION": "MANUALSUBMIT",
      "V_UNIQUE_ID": this.globals.Report.TEMP_UNIQUE_ID[0],
      "TimeZone": new Date().getTimezoneOffset(),
      "REST_Service": "Artifacts",
      "Verb": "POST",
    }
    console.log(body)
    this.http.post('https://enablement.us/Enablement/rest/Submit/FormSubmit ', body).subscribe(
      res => {
        console.log(res);
      }
    );
  }

  Delete(file) {
    console.log(file)
    let str =
      `V_ARTFCT_ID=${file.ARTFCT_ID}&V_ARTFCT_NM=${file.ARTFCT_NM}&V_SRC_CD=${this.globals.Report.SRC_CD}&V_PHY_LCTN=${this.globals.Report.PVP.PHY_LCTN}&V_USR_NM=${this.globals.Report.USR_NM}&V_APP_CD=${this.globals.Report.APP_CD}&V_PRCS_CD=${this.globals.Report.PRCS_CD}&V_SRVC_CD=${this.globals.Report.SRVC_CD}&REST_Service=Artifacts&Verb=DELETE`
    console.log(str)
    this.http.delete('https://enablement.us/Enablement/rest/E_DB/SP?' + str)
      .subscribe(
        res => {
          console.log(res)
          for(let i=0; i<this.allFiles.length; i++){
            if(this.allFiles[i].ARTFCT_ID == file.ARTFCT_ID){
              this.allFiles.splice(i, 1); 
              break;
            }
          } 
          this.selectedFiles.splice(this.selectedFiles.indexOf(file.ARTFCT_ID), 1) 
          console.log(this.allFiles, this.selectedFiles)
        })
  }

  cancelbtn_click() {
    console.log('cancelbtn_click');
    this.router.navigateByUrl("End_User");
  }

  reset() {
    this.form.reset();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalService.hide(1);
  }


}

// export class allFiles {
//   ARTFCT_NM: string[];

//   constructor() {

//   }
// }
