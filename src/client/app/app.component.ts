/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';
import { AuthService, } from './shared/services/auth.service';
import { CookieService } from './shared/services/cookie.service';
import { ChatModule } from './chat';

let template = require('./app.html');

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    '../sass/main.scss'
  ],
  template
})
export class AppComponent {
  public appLogo = 'assets/img/author-logo.gif';
  public author = '@datatype_void'
  public name = 'Codezinger';
  public url = 'https://twitter.com/datatype_void';

  constructor(private appState: AppState, private authService: AuthService, private cookieService: CookieService) {

  }

  ngOnInit() {
    //console.log('Initial App State', this.appState.state);
  }

  logout() {
    this.authService.logout().map(res => res.json)
      .subscribe((res) => {
        console.log(res);
      }, (err) => {
        console.error(err);
      });
  }

}

/*
 * For help or questions please contact me at @datatype_void on twitter
 * or our chat on Slack at http://www.davidniciforovic.com/wp-login.php?action=slack-invitation
 */
