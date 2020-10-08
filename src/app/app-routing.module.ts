import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './Base-Components/dashboard/dashboard.component';
import { FormulaireConnexionComponent } from './Base-components/formulaire-connexion/formulaire-connexion.component';
import { MenuEntreePrincipaleComponent } from './Base-Components/menu-entree-principale/menu-entree-principale.component';
import { PageNotFoundComponentComponent } from './Base-components/page-not-found-component/page-not-found-component.component';
import { CarteComponent } from './Module-Client-Particulier/carte/carte.component';
import { MenuPrincipalComponent } from './Module-Client-Particulier/menu-principal/menu-principal.component';
import { StatutCommercialComponent } from './Module-Client-Particulier/statut-commercial/statut-commercial.component';
import { StatutInstallationComponent } from './Module-Client-Particulier/statut-installation/statut-installation.component';
import { ModifierFicheClientComponent } from './Module-Client-Particulier/statut-lead/modifier-fiche-client/modifier-fiche-client.component';
import { AjoutClientComponent, StatutLeadComponent } from './Module-Client-Particulier/statut-lead/statut-lead.component';
// import { MenuPrincipalComponent } from './Module-Client-Particulier/menu-principal/menu-principal.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: FormulaireConnexionComponent },
  { path: 'menuprincipal', component: MenuEntreePrincipaleComponent },

  {
    path: 'module_clients_particuliers', component: MenuPrincipalComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'carte', component: CarteComponent },
      { path: 'statut-lead', component: StatutLeadComponent, },
      { path: 'statut-commercial', component: StatutCommercialComponent },
      { path: 'statut-installation', component: StatutInstallationComponent },

    ]
    //  loadChildren: () => import('./Module-Client-Particulier/module-particulier.module').then(m => m.ModuleParticulierModule)
  },

  
  { path: 'modifier_fiche_client', component: ModifierFicheClientComponent },
  // {
  //   path: 'orders',
  //   loadChildren: () => import('./Module-Client-Professionnel/').then(m => m.OrdersModule)
  // }


  { path: '**', component: PageNotFoundComponentComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const BaseComponents = [FormulaireConnexionComponent,
  MenuEntreePrincipaleComponent,
  PageNotFoundComponentComponent,

  ///////  Composants du module client particulier  /////////////
  MenuPrincipalComponent,
  DashboardComponent,
  StatutLeadComponent,
  StatutCommercialComponent,
  StatutInstallationComponent,
  AjoutClientComponent,
  ModifierFicheClientComponent
];
