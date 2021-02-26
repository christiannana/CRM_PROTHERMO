import { Component, OnInit,  ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  activeRoute = localStorage.getItem('activeRoute')
  username: string;
  // @ViewChild('drawer') drawer: MenuPrincipalComponent;
 
  constructor(public route: Router, private routeCon: ActivatedRoute) { 
   
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('username')
    localStorage.setItem('role', 'agent');
    this.route.navigate([this.activeRoute], { relativeTo: this.routeCon })
  }
 
  onReleod(){window.location.reload();}
  
  onDeconnexion(){
    localStorage.removeItem('token')
    this.route.navigate(['/'])
  }

onCarte(){
  this.route.navigate(['carte'], { relativeTo: this.routeCon })
}
  onDashboard() {
    this.route.navigate(['dashboard'], { relativeTo: this.routeCon })
  }
  onClientInstallation() {
    this.route.navigate(['statut-installation'], { relativeTo: this.routeCon });
    localStorage.setItem('activeRoute', 'statut-installation')
  }

  onClientCommerciale() {
    this.route.navigate(['statut-commercial'], { relativeTo: this.routeCon });
    localStorage.setItem('activeRoute', 'statut-commercial')
  }

  onClientLead() {
    this.route.navigate(['statut-lead'], { relativeTo: this.routeCon });
    localStorage.setItem('activeRoute', 'statut-lead')
  }

  onCalendrier(){
    this.route.navigate(['calendrier'], { relativeTo: this.routeCon });
  }

  onClientRegie() {
    this.route.navigate(['regie-by-user'], { relativeTo: this.routeCon });
    localStorage.setItem('activeRoute', 'regie-by-user')
  }

}
