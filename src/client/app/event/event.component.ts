import { Component } from '@angular/core';
import {EventService } from './event.service';

class Event {
    name: String;
    description: String;
}

@Component({
    selector: "event_page",
    templateUrl: './event.component.html',
    providers: [EventService]

})
export class EventComponent {
    event: Event;
    constructor(private eventService: EventService) {
        this.event = new Event();
    }

    addEvent() {
        console.log(this.event);
        this.eventService.saveEvent(this.event, () => {
        },
            () => {
            });
    }
}
