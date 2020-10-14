import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AjoutProduitsComponent, ProduitsComponent } from './produits/produits.component';
import { AgentsComponent } from './agents/agents.component';
import { MenuPrincipalAdminComponent } from './menu-principal-admin/menu-principal-admin.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
//import { AjoutAgentsComponent } from './agents/ajout-agents/ajout-agents.component';


@NgModule({
   declarations: [ //ProduitsComponent, AgentsComponent, DashboardAdminComponent
     //AjoutProduitsComponent
 // AjoutAgentsComponent
],
  imports: [
    CommonModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
