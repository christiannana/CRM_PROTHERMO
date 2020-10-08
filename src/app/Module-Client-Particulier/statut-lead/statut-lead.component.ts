import { Component, OnInit,  } from '@angular/core';

import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { APIServiceService } from 'src/app/Services/api/api-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-statut-lead',
  styleUrls: ['./statut-lead.component.css'],
  templateUrl: './statut-lead.component.html',
})
export class StatutLeadComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  datas: any;

  constructor(public http: APIServiceService, public dialog: MatDialog, public route: Router, public routeCon: ActivatedRoute) {
    this.onFechtDatas()
  }

  ngAfterViewInit() {
  }

  onFechtDatas() {
    this.http.onJSONplaceHolder().subscribe((res: any) => {
      this.datas = res;
    }, (error: any) => {
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(AjoutClientComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

    onSuprimmer(){
      alert('Fiche client suprimmée.')
    }
    onEditFiche(){
      setTimeout(()=>{
        this.route.navigateByUrl('modifier_fiche_client', {relativeTo: this.routeCon})
      },500)
    }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

//////////////////   DIALOG AJOUT DE CLIENT ///////////////////////////////////////

@Component({
  selector: 'app-ajout-client',
  templateUrl: './ajout-client/ajout-client.component.html',
  styleUrls: ['./ajout-client/ajout-client.component.css']
})
export class AjoutClientComponent implements OnInit {
  
  @ViewChild('fileInput')
  fileInput;

  file: File | null = null;

  constructor() { }

  onClickFileInputButton(): void {
    this.fileInput.nativeElement.click();
  }

  onChangeFileInput(): void {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    this.file = files[0];
  }



  ngOnInit(): void {
  }

}
