import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';
import { AuthService } from './services/auth.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  loginStatus: boolean = false;
  private readonly _destroying$ = new Subject<void>();
  userName: string = "";

  title = 'ui-service';

  private msalConfig = environment.mslConfig;
  private apiScopes = [this.msalConfig.apiScope];

  constructor(
    private broadcastService: MsalBroadcastService,
    private msalService: MsalService,
    private route: Router,
    private authService: AuthService) {

    this.broadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.ACCOUNT_ADDED || msg.eventType === EventType.ACCOUNT_REMOVED),
      )
      .subscribe((result: EventMessage) => {
        if (this.msalService.instance.getAllAccounts().length === 0) {
          this.route.navigate(['/login']);
        } else {
          this.setLoginDisplay();
        }
      });

    this.broadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
      })
  }

  setLoginDisplay() {
    this.loginStatus = this.msalService.instance.getAllAccounts().length > 0;
    if (this.loginStatus) {
      const profile_data = this.msalService.instance.getAllAccounts()[0];
      this.userName = profile_data.username;
      this.msalService.instance.setActiveAccount(profile_data);
      this.route.navigate(['/']);
    } else {
      //this.route.navigate(['/login']);
    }
  }

  setAuthToken() {
    this.msalService.instance.acquireTokenSilent({
      account: this.msalService.instance.getActiveAccount()!,
      scopes: this.apiScopes
    }).then((response: AuthenticationResult) => {
      localStorage.setItem('auth_token', response.accessToken);
    });
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  msLogout() {
    this.authService.microsoftLogout();
  }

  isLoggedIn() {
    return this.authService.checkLoginStatus();
  }
}
