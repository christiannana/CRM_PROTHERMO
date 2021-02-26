import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu-principal-admin',
  templateUrl: './menu-principal-admin.component.html',
  styleUrls: ['./menu-principal-admin.component.css']
})
export class MenuPrincipalAdminComponent implements OnInit {
  panelOpenState = false;
  activeRoute = localStorage.getItem('activeRoute')
  username: string;

  constructor(public route: Router, private routeCon: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.username = localStorage.getItem('username')
    localStorage.setItem('role', 'administration');
    this.route.navigate([this.activeRoute], { relativeTo: this.routeCon })
  }

  onReleod(){window.location.reload();}

  onDeconnexion(){
    localStorage.removeItem('token')
    this.route.navigate(['/'])
  }


  onLead() {
    this.route.navigate(['lead'], { relativeTo: this.routeCon })
    localStorage.setItem('activeRoute', 'lead')
  }

  onCommercial() {
    this.route.navigate(['commercial'], { relativeTo: this.routeCon })
    localStorage.setItem('activeRoute', 'commercial')
  }

  onInstallation() {
    this.route.navigate(['installation'], { relativeTo: this.routeCon })
    localStorage.setItem('activeRoute', 'installation')
  }

  onAgent() {
    this.route.navigate(['agents'], { relativeTo: this.routeCon })
    localStorage.setItem('activeRoute', 'agents')
  }

  onCalendrier() {
    this.route.navigate(['calendrier'], { relativeTo: this.routeCon })
    localStorage.setItem('activeRoute', 'calendrier')
  }

  onProduit() {
    this.route.navigate(['produits'], { relativeTo: this.routeCon })
    localStorage.setItem('activeRoute', 'produits')
  }
  onDashboard() {
    this.route.navigate(['dashboard'], { relativeTo: this.routeCon })
    localStorage.setItem('activeRoute', 'dashboard')
  }


  onAides() {
    this.route.navigate(['aides'], { relativeTo: this.routeCon })
    localStorage.setItem('activeRoute', 'aides')
  }

  onParametres() {
    this.route.navigate(['parametres'], { relativeTo: this.routeCon })
    localStorage.setItem('activeRoute', 'parametres')
  }

  onAffectation(){
    this.route.navigate(['affectation'], { relativeTo: this.routeCon })
    localStorage.setItem('activeRoute', 'affectation')
  }

  onRegieAdmin(){
    this.route.navigate(['regie_admin'], { relativeTo: this.routeCon })
    localStorage.setItem('activeRoute', 'regie_admin')
  }


}
