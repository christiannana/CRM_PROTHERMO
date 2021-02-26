import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule, AdminModuleComponent } from './administration-routing.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';

import { AngualertModule } from 'angualert';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
// import { NgxBootstrapDialogModule } from 'ngx-bootstrap-dialog';
// import { GoogleMapsModule } from '@angular/google-maps';

//import { AffectationComponent } from './affectation/affectation.component';
//import { AjoutAgentsComponent } from './agents/ajout-agents/ajout-agents.component';
//DataTable
import {DataTablesModule} from 'angular-datatables';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
// import { CalendrierComponent } from './calendrier/calendrier.component';

@NgModule({
   declarations: [ AdminModuleComponent,   //ProduitsComponent, AgentsComponent, DashboardAdminComponent
     //AjoutProduitsComponent
     // AjoutAgentsComponent
     //AffectationComponent
 ],
  imports: [


     MatFormFieldModule,
    // MatSliderModule,  
     
    NgxDropzoneModule,
    // AngualertModule,  
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    // ReactiveFormsModule,  
    // LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,  
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTabsModule,
    MatExpansionModule,  
    MatProgressBarModule,  
    MatCheckboxModule,
    MatBadgeModule,
    MatDatepickerModule, 
    MatStepperModule,
   DataTablesModule,

    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    SweetAlert2Module.forRoot(),

    CommonModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
