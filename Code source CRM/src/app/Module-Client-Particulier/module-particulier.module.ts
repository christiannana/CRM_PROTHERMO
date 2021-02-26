import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientParticulierComponent, ModuleParticulierRoutingModule } from './module-particulier-routing.module';
import { RegieByUserComponent } from './regie-by-user/regie-by-user.component';
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
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AngualertModule } from 'angualert';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxBootstrapDialogModule } from 'ngx-bootstrap-dialog';
import { GoogleMapsModule } from '@angular/google-maps';
import { SidebarModule } from 'ng-sidebar';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatSelectFilterModule } from 'mat-select-filter';
//import { GestionEtapeTraitementComponent } from './fiche-clients-particulier/gestion-etape-traitement/gestion-etape-traitement.component';
//Datatable
import {DataTablesModule} from 'angular-datatables';

@NgModule({
  declarations: [  ClientParticulierComponent, ],
  imports: [

    MatFormFieldModule,
    MatSliderModule,  
 
    NgxDropzoneModule,
    // AngualertModule,  
    FormsModule,
    MatInputModule,
    MatButtonModule,  
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatPaginatorModule,
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
    MatAutocompleteModule,  
    
    MatSelectFilterModule,
               
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    SidebarModule.forRoot(),
    SweetAlert2Module.forRoot(),
    // AgmCoreModule.forRoot({ 
    //   apiKey: 'AIzaSyCsTsQaBx6VCMbzq6U23DVDotKU83ikfpM',
    //   libraries: ['places'],
    // }),  
    GoogleMapsModule, 
    NgxBootstrapDialogModule,  
    DataTablesModule,

    CommonModule,
    ModuleParticulierRoutingModule,


  ],
 
})

export class ModuleParticulierModule { }
