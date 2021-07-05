import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HighlightComponent } from './highlight/highlight.component';
import { TextInputHighlightModule } from 'angular-text-input-highlight';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HighlightService } from './highlight/highlight.service';

@NgModule({
  declarations: [
    AppComponent,
    HighlightComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TextInputHighlightModule,
    HttpClientModule
  ],
  providers: [
    HighlightService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
