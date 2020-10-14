import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { APIServiceService } from 'src/app/Services/api/api-service.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  ngOnInit(): void {
  }



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
    const dialogRef = this.dialog.open(AjoutProduitsComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onSuprimmer() {
    alert('Fiche client suprimmée.')
  }
  onEditFiche() {
    setTimeout(() => {
      this.route.navigateByUrl('modifier_fiche_client', { relativeTo: this.routeCon })
    }, 500)
  }



}



//////////////////   DIALOG AJOUT DE PRODUITS  ///////////////////////////////////////

@Component({
  selector: 'app-ajout-produits',
  templateUrl: './ajout-produits/ajout-produits.component.html',
  styleUrls: ['./ajout-produits/ajout-produits.component.css']
})
export class AjoutProduitsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
