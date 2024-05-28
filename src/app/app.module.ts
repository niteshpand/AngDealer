import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { DealerFormComponent } from './dealer-form/dealer-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DealerListComponent } from './dealer-form/dealer-list/dealer-list.component';
import { DataService } from './data.service';

@NgModule({
  declarations: [AppComponent, DealerFormComponent, DealerListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: DataService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
