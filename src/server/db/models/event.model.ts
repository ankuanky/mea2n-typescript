
import mongoose = require('mongoose');

let Schema = mongoose.Schema;


export class Event {
    name: String;
    description: String;
    constructor(event: Event) {
        this.name = event.name;
        this.description = event.description;
     }
}

let eventSchema = new Schema({
    name: String,
    description: String
});

export interface EventDocument extends Event, mongoose.Document { }

export let Events = mongoose.model<EventDocument>('Event', eventSchema);