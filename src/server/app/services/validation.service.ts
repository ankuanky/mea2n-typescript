"use strict";

import * as express from 'express';

import { IUser, User, UserDocument, Users } from '../../db/models/user.model';

const BASE_URI = '/validate';

export class ValidationService {

    constructor() {
    }

    public validateUser(req: express.Request, res: express.Response) {
        let username = { 'local.username': req.params.username };
        // Use `mongoose` to a single `user` item by `username` in the database
        Users.findOne(username, (err: any, user: User) => {
            if (err)
                res.send(err);
            else {
                // If no user was found with a matching username
                if (user === null) {
                    // Set a `HTTP` status code of `404` `Not Found`
                    res.status(200);
                    // Send our validation object
                    res.json({ usernameTaken: false });
                    // If a user was found with a matchin username
                } else {
                    // Set a `HTTP` status code of `409` `Conflict`
                    res.status(409);
                    // Send our validation object
                    res.json({ usernameTaken: true });
                }
            }
        });
    }
}
