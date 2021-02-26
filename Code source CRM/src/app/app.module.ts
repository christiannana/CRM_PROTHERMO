import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';

import { AppRoutingModule, BaseComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule, MAT_SELECT_SCROLL_STRATEGY_PROVIDER } from '@angular/material/select';
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



import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
//import { NgxDropzoneModule } from 'ngx-dropzone/lib/ngx-dropzone.module';
//datatable
import {DataTablesModule} from 'angular-datatables';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { AdminModuleComponent } from './administration/administration-routing.module';

import { AngualertModule } from 'angualert';
import { AuthInterceptor, httpInterceptorProviders } from './Services/api/api-service.service';
// import { ClientParticulierComponent } from './Module-Client-Particulier/module-particulier-routing.module';
import { SidebarModule } from 'ng-sidebar';
import { NgxBootstrapDialogModule } from 'ngx-bootstrap-dialog';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { OnlyLoggedInUsersGuard } from './Services/auth/auth-service.service';
// import { AgmCoreModule } from '@agm/core/lib/core.module';
// import { AgmCoreModule } from '@agm/core';
import { GoogleMapsModule } from '@angular/google-maps';
import {MatStepperModule} from '@angular/material/stepper';
import { MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER } from '@angular/material/tooltip';


@NgModule({
  declarations: [   
    AppComponent,
    BaseComponents,        
  ],
     
  imports: [
    MatFormFieldModule,
    MatSliderModule,  
     
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxDropzoneModule,
    AngualertModule,  
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,  
    LayoutModule,
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
    SidebarModule.forRoot(),
    SweetAlert2Module.forRoot(),
    // AgmCoreModule.forRoot({ 
    //   apiKey: 'AIzaSyCsTsQaBx6VCMbzq6U23DVDotKU83ikfpM',
    //   libraries: ['places'],
    // }),  
    GoogleMapsModule, 
    NgxBootstrapDialogModule,
    NgbModule,  
  ],

   providers: [  httpInterceptorProviders,
   {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {}},
   OnlyLoggedInUsersGuard,

   MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER,
    MAT_SELECT_SCROLL_STRATEGY_PROVIDER
  ],
  
  bootstrap: [AppComponent,
   BaseComponents]
})
export class AppModule { }

