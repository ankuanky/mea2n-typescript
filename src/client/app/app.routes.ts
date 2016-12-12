import { Routes, RouterModule } from '@angular/router';
import { NoContentComponent } from './no-content';
import { EventComponent } from './event/index';
import { RegisterComponent } from './register';


import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
    { path: '', component: RegisterComponent },
    { path: 'event', component: EventComponent },
    { path: '**', component: NoContentComponent },

];
