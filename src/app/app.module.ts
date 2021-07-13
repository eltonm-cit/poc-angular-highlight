import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HighlightComponent } from './highlight/highlight.component';
import { TextInputHighlightModule } from 'angular-text-input-highlight';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HighlightService } from './highlight/highlight.service';
import { environment } from 'src/environments/environment';

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
    HttpClientModule,
    NgxGoogleAnalyticsModule.forRoot(environment.ga),
    NgxGoogleAnalyticsRouterModule.forRoot({ include: [ '/highlight' ] })
  ],
  providers: [
    HighlightService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
