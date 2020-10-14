
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentsComponent, AjoutAgentsComponent } from './agents/agents.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { MenuPrincipalAdminComponent } from './menu-principal-admin/menu-principal-admin.component';
import { AjoutProduitsComponent, ProduitsComponent } from './produits/produits.component';

const routes: Routes = [
  {path:'',component:  MenuPrincipalAdminComponent, 
      children: [
        {path:'agents', component: AgentsComponent},
        {path:'produits', component: ProduitsComponent},
        {path:'dashboard', component: DashboardAdminComponent}
      ]  
  }
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
  AjoutAgentsComponent, ////// Composant spécial *******     boite modale ***

  
]
