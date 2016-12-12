import { ApplicationRef, NgModule } from '@angular/core';
import { AuthConnectionBackend } from './auth-connection.backend';
import { BrowserModule } from '@angular/platform-browser';
import { createInputTransfer,
         createNewHosts,
         removeNgStyles } from '@angularclass/hmr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';
import { RouterModule } from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
// App is our top level component
import { AppComponent } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { ENV_PROVIDERS } from './environment';
import { LoginModule } from './login';
import { NoContentComponent } from './no-content';
import { RegisterComponent, RegisterRoutingModule } from './register';
import { ROUTES } from './app.routes';

import { EventComponent } from './event/index';
import { SHARED_APP_DIRECTIVES } from './shared/directives';
import { SHARED_APP_SERVICES } from './shared/services';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  ...SHARED_APP_SERVICES,
  { provide: XHRBackend, useClass: AuthConnectionBackend },
  AppState
];

type StoreType = {
  disposeOldHosts: () => void,
  restoreInputValues: () => void,
  state: InternalStateType
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    ...SHARED_APP_DIRECTIVES,
    AppComponent,
    NoContentComponent,
    RegisterComponent,
    EventComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    LoginModule,
    ReactiveFormsModule,
    RegisterRoutingModule,
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    APP_PROVIDERS,
    ENV_PROVIDERS,
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {}

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
