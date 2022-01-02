import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewSavedCardListComponent } from './Componets/view-saved-card-list/view-saved-card-list.component';
import { AddCardDetailsComponent } from './Componets/add-card-details/add-card-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RemoveCardDetailsComponent } from './Componets/remove-card-details/remove-card-details.component';
import { TextMaskModule } from 'angular2-text-mask';
@NgModule({
  declarations: [
    AppComponent,
    ViewSavedCardListComponent,
    AddCardDetailsComponent,
    RemoveCardDetailsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    TextMaskModule,

  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
