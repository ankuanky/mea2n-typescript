"use strict";

import * as express from 'express';
// Load `User` model
//import user = require('../models/user.model');
//import User = user.User // alias
//import UserDocument = user.UserDocument // alias
//import Users = user.Users // alias
import { IUser, User, UserDocument, Users } from '../../db/models/user.model';

const BASE_URI = '/user';

// import { IUser, User, UserDocument, Users } from '../models/user.model';


export class UserService {
    constructor() {
        // assignment of variables;
    }

    public userList(page, itemsPerPage, currentPage, pageNumber, skip, limit): any {

        Users.find().count((err, totalItems) => {
            if (err)
                return err;
            else
                Users.aggregate(
                    [
                        { $skip: skip },
                        { $limit: itemsPerPage }

                    ], function(err, data) {
                        if (err) {
                            return err;
                        }
                        else {
                            let jsonOb =
                                {
                                    "paginationData": {
                                        "totalItems": totalItems,
                                        "currentPage": currentPage,
                                        "itemsPerPage": itemsPerPage
                                    },
                                    "data": data
                                };

                            return jsonOb;
                        }
                    }
                );
        });
    }

}

