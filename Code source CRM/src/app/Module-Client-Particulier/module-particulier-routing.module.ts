import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../Base-Components/dashboard/dashboard.component';
import { OnlyLoggedInUsersGuard } from '../Services/auth/auth-service.service';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { CarteComponent } from './carte/carte.component';
import { AjoutInfosFiscalsComponent } from './fiche-clients-particulier/ajout-infos-fiscals/ajout-infos-fiscals.component';
import { FicheClientsParticulierComponent } from './fiche-clients-particulier/fiche-clients-particulier.component';
import { GestionEtapeTraitementComponent } from './fiche-clients-particulier/gestion-etape-traitement/gestion-etape-traitement.component';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { RegieByUserComponent } from './regie-by-user/regie-by-user.component';
import { StatutCommercialComponent } from './statut-commercial/statut-commercial.component';
import { StatutInstallationComponent } from './statut-installation/statut-installation.component';
import { AjoutClientComponent, StatutLeadComponent } from './statut-lead/statut-lead.component';


const routes: Routes = [
    {
    path: '', component: MenuPrincipalComponent,  canActivate: [OnlyLoggedInUsersGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent,  canActivate: [OnlyLoggedInUsersGuard] },
      { path: 'carte', component: CarteComponent },
      { path: 'statut-lead', component: StatutLeadComponent,  canActivate: [OnlyLoggedInUsersGuard] },
      { path: 'statut-commercial', component: StatutCommercialComponent , canActivate: [OnlyLoggedInUsersGuard] },
      { path: 'statut-installation', component: StatutInstallationComponent ,  canActivate: [OnlyLoggedInUsersGuard]},
      { path: 'calendrier', component: CalendrierComponent , canActivate: [OnlyLoggedInUsersGuard] },
      { path: 'regie-by-user', component: RegieByUserComponent , canActivate: [OnlyLoggedInUsersGuard] },
  
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
    AjoutClientComponent,
    FicheClientsParticulierComponent,
    CalendrierComponent,
    RegieByUserComponent,
    GestionEtapeTraitementComponent,

    AjoutInfosFiscalsComponent,
   
]
