import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { APIServiceService } from 'src/app/Services/api/api-service.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent implements OnInit {
  datas: any;

  ngOnInit(): void {
  }

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
    const dialogRef = this.dialog.open(AjoutAgentsComponent);
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



@Component({
  selector: 'app-ajout-agents',
  templateUrl: './ajout-agents/ajout-agents.component.html',
  styleUrls: ['./ajout-agents/ajout-agents.component.css']
})
export class AjoutAgentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
