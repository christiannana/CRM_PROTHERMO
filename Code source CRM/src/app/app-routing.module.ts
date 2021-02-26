import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailAgentComponent } from './administration/agents/detail-agent/detail-agent.component';
import { DetailProduitComponent } from './administration/produits/detail-produit/detail-produit.component';
import { FormulaireConnexionComponent } from './Base-components/formulaire-connexion/formulaire-connexion.component';
import { MenuEntreePrincipaleComponent } from './Base-Components/menu-entree-principale/menu-entree-principale.component';
import { PageNotFoundComponentComponent } from './Base-components/page-not-found-component/page-not-found-component.component';
import { FicheClientsParticulierComponent } from './Module-Client-Particulier/fiche-clients-particulier/fiche-clients-particulier.component';
import { AceuilRegieComponent } from './Module-Client-Particulier/sous-module-regie/aceuil-regie/aceuil-regie.component';
import { AjoutClientRegieComponent } from './Module-Client-Particulier/sous-module-regie/ajout-client-regie/ajout-client-regie.component';
import { FicheClientRegieComponent } from './Module-Client-Particulier/sous-module-regie/fiche-client-regie/fiche-client-regie.component';
import { OnlyLoggedInUsersGuard } from './Services/auth/auth-service.service';

const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: FormulaireConnexionComponent },
  { path: 'menuprincipal', component: MenuEntreePrincipaleComponent,  canActivate: [OnlyLoggedInUsersGuard] },

  {
    path: 'module_clients_particuliers',
      loadChildren: () => import('./Module-Client-Particulier/module-particulier.module').then(m => m.ModuleParticulierModule, )
  },

  {
    path: 'module_clients_professionnel',
      loadChildren: () => import('./Module-Client-Professionnel/module-professionnel/module-professionnel.module').then(m => m.ModuleProfessionnelModule)
  },
  
  {
    path: 'administration',
      loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule)
  },

  { path: 'modifier_fiche_client', component: FicheClientsParticulierComponent,  canActivate: [OnlyLoggedInUsersGuard]},
  { path:'detail_agent',component:  DetailAgentComponent,  canActivate: [OnlyLoggedInUsersGuard] }, 
  { path:'detail_produit',component:   DetailProduitComponent,  canActivate: [OnlyLoggedInUsersGuard] }, 
  { path:'acuail_regie',component:   AceuilRegieComponent,  canActivate: [OnlyLoggedInUsersGuard] }, 
  { path:'ajout_client_regie',component:   AjoutClientRegieComponent,  canActivate: [OnlyLoggedInUsersGuard] }, 

  { path: '**', component: PageNotFoundComponentComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }),],
  exports: [RouterModule]
})

export class AppRoutingModule { }

export const BaseComponents = [
  FormulaireConnexionComponent,
  MenuEntreePrincipaleComponent,
  PageNotFoundComponentComponent,

  AjoutClientRegieComponent,
  AceuilRegieComponent,
  FicheClientRegieComponent,

];
