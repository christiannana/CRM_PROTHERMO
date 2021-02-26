import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-entree-principale',
  templateUrl: './menu-entree-principale.component.html',
  styleUrls: ['./menu-entree-principale.component.css']
})
export class MenuEntreePrincipaleComponent implements OnInit {

  constructor(public route: Router) { }

  ngOnInit(): void {
  }

  onAdministration(){
    localStorage.setItem('activeRoute', 'affectation')
    this.route.navigate(['/administration'])
  }

  onParticulier(){
    localStorage.setItem('activeRoute', 'statut-lead')
    this.route.navigate(['/module_clients_particuliers'])
  }

  onModuleRegie(){
    this.route.navigate(['/acuail_regie'])
  }
  onProfessionnel(){
    alert('Modules en cours de développement !!!');
  }

}
