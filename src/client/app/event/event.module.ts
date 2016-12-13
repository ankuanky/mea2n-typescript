import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';
import { EventComponent} from './event.component';
import {EventService } from './event.service';
const routes: Routes = [
    {path:'event', component: EventComponent }];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)],
    providers: [
        EventService
    ],
    declarations: [
        EventComponent
    ],
    exports: [
     RouterModule
        ]
})
export class EventModule { }