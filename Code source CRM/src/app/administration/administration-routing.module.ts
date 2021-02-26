
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FicheClientsParticulierComponent } from '../Module-Client-Particulier/fiche-clients-particulier/fiche-clients-particulier.component';
import { OnlyLoggedInUsersGuard } from '../Services/auth/auth-service.service';
import { AffectationComponent } from './affectation/affectation.component';
import { AgentsComponent, AjoutAgentsComponent } from './agents/agents.component';
import { DetailAgentComponent } from './agents/detail-agent/detail-agent.component';
import { AidesComponent } from './aides/aides.component';
import { AjoutAideComponent } from './aides/ajout-aide/ajout-aide.component';
import { CalendrierAdminComponent } from './calendrier/calendrier.component';
import { CommercialComponent } from './commercial/commercial.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { InstallationComponent } from './installation/installation.component';
import { LeadComponent } from './lead/lead.component';
import { MenuPrincipalAdminComponent } from './menu-principal-admin/menu-principal-admin.component';
import { ParametresComponent } from './parametres/parametres.component';
import { DetailProduitComponent } from './produits/detail-produit/detail-produit.component';
import { AjoutProduitsComponent, ProduitsComponent } from './produits/produits.component';
import { RegieAdminComponent } from './regie-admin/regie-admin.component';

const routes: Routes = [
  {
    path: '', component: MenuPrincipalAdminComponent, canActivate: [OnlyLoggedInUsersGuard],
    children: [
      { path: 'calendrier', component: CalendrierAdminComponent  ,  canActivate: [OnlyLoggedInUsersGuard] },
      { path: 'agents', component: AgentsComponent  ,  canActivate: [OnlyLoggedInUsersGuard] },
      { path: 'produits', component: ProduitsComponent  ,  canActivate: [OnlyLoggedInUsersGuard] },
      { path: 'dashboard', component: DashboardAdminComponent ,  canActivate: [OnlyLoggedInUsersGuard]  },
      { path: 'lead', component: LeadComponent  ,  canActivate: [OnlyLoggedInUsersGuard] },
      { path: 'commercial', component: CommercialComponent  ,  canActivate: [OnlyLoggedInUsersGuard] },
      { path: 'installation', component: InstallationComponent ,  canActivate: [OnlyLoggedInUsersGuard]  },
      { path: 'aides', component: AidesComponent ,  canActivate: [OnlyLoggedInUsersGuard]  },
      { path: 'parametres', component: ParametresComponent  ,  canActivate: [OnlyLoggedInUsersGuard] },
      { path: 'affectation', component: AffectationComponent  ,  canActivate: [OnlyLoggedInUsersGuard] },
      { path: 'regie_admin', component: RegieAdminComponent  ,  canActivate: [OnlyLoggedInUsersGuard] },
    ]
  },

  {path: 'modifier_fiche_client', component: FicheClientsParticulierComponent, canActivate: [OnlyLoggedInUsersGuard],}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }

export const AdminModuleComponent = [
  MenuPrincipalAdminComponent,
  AgentsComponent,
  ProduitsComponent,
  DashboardAdminComponent,

  AjoutProduitsComponent, ////  Composant spécial ******* boite modale  *****
  AjoutAgentsComponent, ////// Composant spécial ******* boite modale ***

  LeadComponent,
  CommercialComponent,
  InstallationComponent,
  AidesComponent,
  ParametresComponent,

  DetailProduitComponent,
  DetailAgentComponent,
  AffectationComponent,

  RegieAdminComponent,
  AjoutAideComponent,
  CalendrierAdminComponent,

]
