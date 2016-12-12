"use strict";

import * as express from 'express';
import { Event, EventDocument, Events } from '../../db/models/event.model';

const BASE_URI = '/event';

// import { IUser, User, UserDocument, Users } from '../models/user.model';


export class EventService {
    constructor() {
        // assignment of variables;
    }

    public saveEvent(event:Event): any {
        
        console.log(event);
    }

}

