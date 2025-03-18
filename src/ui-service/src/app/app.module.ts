import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MsalModule, MsalRedirectComponent, MsalGuard, MsalInterceptor, MsalService } from "@azure/msal-angular";
import { PublicClientApplication, InteractionType } from "@azure/msal-browser";
import { HTTP_INTERCEPTORS, HttpClientModule  } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { LoginComponent } from './account/login.component/login.component';
import { HomeComponent } from './home/home.component';

const isIE =
  window.navigator.userAgent.indexOf("MSIE ") > -1 ||
  window.navigator.userAgent.indexOf("Trident/") > -1;

const msalConfig = environment.mslConfig;

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: msalConfig.clientId,
          authority: msalConfig.authority,
          redirectUri: msalConfig.redirectUri
        },
        cache: {
          cacheLocation: "localStorage",
          storeAuthStateInCookie: isIE,
        },
      }),
      {
        interactionType: InteractionType.Redirect,
        authRequest: {
          scopes: ["user.read"],
        },
      },
      {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map([
          ["https://graph.microsoft.com/v1.0/me", ["user.read"]]
        ]),
      }
    )
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { 
  constructor(private msalService: MsalService) {
    this.msalService.instance.initialize(); // Initialize the MSAL instance
  }
}
