import { Routes, RouterModule } from '@angular/router';
import { NoContentComponent } from './no-content';
import { RegisterComponent } from './register';


import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
    { path: '', component: RegisterComponent },
    { path: 'event', loadChildren: './event/event.module#EventModule' },
    { path: '**', component: NoContentComponent }
];
