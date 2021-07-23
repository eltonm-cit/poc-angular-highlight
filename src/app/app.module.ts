import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HighlightComponent } from './highlight/highlight.component';
import { HomeComponent } from './chat/layout/home/home.component';
import { MessagesComponent } from './chat/layout/messages/messages.component'
import { TextInputHighlightModule } from 'angular-text-input-highlight';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HighlightService } from './highlight/highlight.service';
import { environment } from 'src/environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './chat/shared/service/user.service';
import { ChannelService } from './chat/shared/service/channel.service';
import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';
import { myRxStompConfig } from './my-rx-stomp.config';
import { LoginComponent } from './chat/layout/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HighlightComponent,
    HomeComponent,
    MessagesComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TextInputHighlightModule,
    HttpClientModule,
    NgxGoogleAnalyticsModule.forRoot(environment.ga),
    NgxGoogleAnalyticsRouterModule.forRoot({ include: [ '/highlight' ] }),
    NgbModule
  ],
  providers: [
    HighlightService,
    UserService,
    ChannelService,
    {
      provide: InjectableRxStompConfig,
      useValue: myRxStompConfig
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
