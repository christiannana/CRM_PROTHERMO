import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InterfacePrincipaleComponent } from './interface-principale/interface-principale.component';

const routes: Routes = [
  {
    path: '',
    component: InterfacePrincipaleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsParticuliersRoutingModule { }
