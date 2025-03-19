import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MsalModule, MsalRedirectComponent, MsalGuard, MsalInterceptor, MsalService } from "@azure/msal-angular";
import { PublicClientApplication, InteractionType } from "@azure/msal-browser";
import { HTTP_INTERCEPTORS, HttpClientModule  } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { LoginComponent } from './account/login.component/login.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManageCredentialComponent } from './credential/manage/manage-credential.component';
import { ListCredentialComponent } from './credential/list/list-credential.component';
import { HeaderComponent } from './header/header.component';

const isIE =
  window.navigator.userAgent.indexOf("MSIE ") > -1 ||
  window.navigator.userAgent.indexOf("Trident/") > -1;

const msalConfig = environment.mslConfig;
const credentialService = environment.credentialService;

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ManageCredentialComponent,
    ListCredentialComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
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
          scopes: [msalConfig.apiScope],
        },
      },
      {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map([
          [`${credentialService.url}/*`, [msalConfig.apiScope]]
        ]),
      }
    ),
    BrowserAnimationsModule
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
