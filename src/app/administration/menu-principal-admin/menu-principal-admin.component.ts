import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu-principal-admin',
  templateUrl: './menu-principal-admin.component.html',
  styleUrls: ['./menu-principal-admin.component.css']
})
export class MenuPrincipalAdminComponent implements OnInit {
  panelOpenState = false;

  constructor(public route: Router, private routeCon: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.onDashboard();
  }



  onAgent() {
    this.route.navigate(['agents'], { relativeTo: this.routeCon })
  }

  onProduit() {
    this.route.navigate(['produits'], { relativeTo: this.routeCon })
  }
  onDashboard() {
    this.route.navigate(['dashboard'], { relativeTo: this.routeCon })
  }



}
