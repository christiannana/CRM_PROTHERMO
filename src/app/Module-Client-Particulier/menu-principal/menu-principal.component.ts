import { Component, OnInit,  ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  // @ViewChild('drawer') drawer: MenuPrincipalComponent;
 
  constructor(public route: Router, private routeCon: ActivatedRoute) { 
   
  }

  ngOnInit(): void {
   this.onDashboard();
  }
 
  

onCarte(){
  this.route.navigate(['carte'], { relativeTo: this.routeCon })
}
  onDashboard() {
    this.route.navigate(['dashboard'], { relativeTo: this.routeCon })
  }
  onClientInstallation() {
    this.route.navigate(['statut-installation'], { relativeTo: this.routeCon });
  }

  onClientCommerciale() {
    this.route.navigate(['statut-commercial'], { relativeTo: this.routeCon });
  }

  onClientLead() {
    this.route.navigate(['statut-lead'], { relativeTo: this.routeCon });
  }


}
