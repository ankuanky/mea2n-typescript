"use strict";

import * as express from 'express';

import { IUser, User, UserDocument, Users } from '../../db/models/user.model';

const BASE_URI = '/validate';

export class ValidationService {

    constructor() {
    }

    public validateUser(username: string) {
        return new Promise((resolve, reject) => {
            Users.findOne(username, (err: any, user: User) => {
                if (err) {
                    reject(err);
                }
                else {
                    // If no user was found with a matching username
                    if (user === null) {
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                }
            });
        });
        // Use `mongoose` to a single `user` item by `username` in the database

    }
}
