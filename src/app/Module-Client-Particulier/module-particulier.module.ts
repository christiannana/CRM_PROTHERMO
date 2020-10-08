import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientParticulierComponent, ModuleParticulierRoutingModule } from './module-particulier-routing.module';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { CarteComponent } from './carte/carte.component';
//import { AjoutClientComponent } from './statut-lead/ajout-client/ajout-client.component';
import { SuprimmerClientComponent } from './statut-lead/suprimmer-client/suprimmer-client.component';
import { ModifierFicheClientComponent } from './statut-lead/modifier-fiche-client/modifier-fiche-client.component';
import { AjoutClientComponent } from './statut-lead/statut-lead.component';



@NgModule({
  declarations: [MenuPrincipalComponent, ClientParticulierComponent, CarteComponent, AjoutClientComponent, SuprimmerClientComponent, ModifierFicheClientComponent],
  imports: [
    CommonModule,
    ModuleParticulierRoutingModule,
  ],
 
})

export class ModuleParticulierModule { }
