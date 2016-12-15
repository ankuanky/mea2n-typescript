"use strict";

import * as express from 'express';
import { Event, EventDocument, Events } from '../../db/models/event.model';

const BASE_URI = '/event';

// import { IUser, User, UserDocument, Users } from '../models/user.model';


export class EventService {
    constructor() {
        // assignment of variables;
    }

    public saveEvent(event: Event): any {
        return new Promise((resolve, reject) => {
            Events.create(event, (err, data) => {
                if(err) {
                    reject(err);
                }
                resolve(data._id);
            });
        });
    }

}

