import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddNewComponent } from './modal-content/add-new/add-new.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

//import { AppHttpInterceptor } from './interceptors/https.interceptor';
import {ReactiveFormsModule} from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxEditInlineModule } from 'ngx-edit-inline';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddNewComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    SweetAlert2Module.forChild(),
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxEditInlineModule,

  ],
  providers: [
    
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddNewComponent //<<======
  ]
})
export class AppModule { }
