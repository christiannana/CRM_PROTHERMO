import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';

import { AppRoutingModule, BaseComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
//import { NgxDropzoneModule } from 'ngx-dropzone/lib/ngx-dropzone.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminModuleComponent } from './administration/administration-routing.module';



@NgModule({
  declarations: [ AdminModuleComponent,
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
    
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    
    NgbModule,  
  ],
  providers: [
  //  { provider: LocationStrategy,   useClass: HashLocationStrategy }
   {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true,}}
  ],
  bootstrap: [AppComponent,
   BaseComponents]
})
export class AppModule { }
