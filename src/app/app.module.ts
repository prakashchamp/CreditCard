import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardFormComponent } from './card-form/card-form.component';
import { CardListComponent } from './card-list/card-list.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CardDetailsService } from './card-details.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { CardInfoComponent } from './card-info/card-info.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { UpperCasePipe } from '@angular/common';
import { CardNumberPipe } from './card-number.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CardFormComponent,
    CardListComponent,
    CardInfoComponent,
    HomePageComponent,
    PageNotFoundComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatButtonModule,
  ],
  providers: [CardDetailsService, UpperCasePipe, CardNumberPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
