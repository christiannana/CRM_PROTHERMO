import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIServiceService } from 'src/app/Services/api/api-service.service';

@Component({
  selector: 'app-statut-commercial',
  templateUrl: './statut-commercial.component.html',
  styleUrls: ['./statut-commercial.component.css']
})
export class StatutCommercialComponent implements OnInit {
  datas: any[];

  constructor(public http: APIServiceService,  public route: Router, public routeCon: ActivatedRoute) {
    this.onFechtDatas()
  }


  ngOnInit(): void {
    this.onFechtDatas()
  }


  onFechtDatas() {
    this.http.onJSONplaceHolder().subscribe((res: any) => {
      this.datas = res;
    }, (error: any) => {
    })
  }

  // openDialog() {
  //   const dialogRef = this.dialog.open(AjoutClientComponent);
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

    onSuprimmer(){
      alert('Fiche client suprimmée.')
    }
    onEditFiche(){
      setTimeout(()=>{
        this.route.navigateByUrl('modifier_fiche_client', {relativeTo: this.routeCon})
      },500)
    }

}
