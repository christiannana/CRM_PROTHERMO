import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { StatutCommercialComponent } from './statut-commercial/statut-commercial.component';
import { StatutInstallationComponent } from './statut-installation/statut-installation.component';
import { AjoutClientComponent, StatutLeadComponent } from './statut-lead/statut-lead.component';


const routes: Routes = [
    {
    path: '', component: MenuPrincipalComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
     // { path: 'carte', component: DashboardComponent },
      { path: 'statut-lead', component: StatutLeadComponent },
      { path: 'statut-commercial', component: StatutCommercialComponent },
      { path: 'statut-installation', component: StatutInstallationComponent },
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleParticulierRoutingModule { }

export const ClientParticulierComponent = [ 
  MenuPrincipalComponent,
 
    DashboardComponent,
    StatutLeadComponent,
    StatutCommercialComponent,
    StatutInstallationComponent,
    AjoutClientComponent
]
