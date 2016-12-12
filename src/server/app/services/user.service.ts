"use strict";

import * as express from 'express';
import { IUser, User, UserDocument, Users } from '../../db/models/user.model';
const BASE_URI = '/user';


export class UserService {
    constructor() {
        // assignment of variables;
    }

    public userList(page, itemsPerPage, currentPage, pageNumber, skip, limit): any {
        return new Promise((resolve, reject) => {
            Users.find().count((err, totalItems) => {
                if (err) {
                    reject(err);
                } else {
                    Users.aggregate(
                        [
                            { $skip: skip },
                            { $limit: itemsPerPage }

                        ], function(err, data) {
                            if (err) {
                                reject(err);
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

                                resolve(jsonOb);
                            }
                        });
                }
            });
        });
    }

    public saveUser(newUser: any) {
        return new Promise((resolve, reject) => {
            Users.findOne({
                $or: [{ 'username': newUser.username },
                    { 'email': newUser.email }
                ]
            }, (err: any, user: any) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                if (user) {
                    resolve(null);
                } else {

                    Users.create(newUser, (err: any, user: any) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        }
                        resolve(user._id);
                    });
                }
            });
        });

    }
    public getUser(id: any) {
        return new Promise((resolve, reject) => {
            Users.find({ _id: id }, (err: any, user: User) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(user);
            });
        });

    }

    public deleteUser(id: any) {
        return new Promise((resolve, reject) => {
            this.getUser(id)
                .then((user: any) => {
                    if (!user) {
                        resolve(null);
                    } else {
                        Users.remove({ _id: id }, (err: any) => {
                            if (err) {
                                reject(err);
                            }
                            resolve(id);
                        });
                    }
                })
                .catch((err: any) => {
                    reject(err);
                });
        });
    }
    
    public updateUser(id: any, userDetails: any) {
        return new promise((resolve, reject) => {
            this.getUser(id)
                .then((user: any) => {
                    if (!user) {
                        resolve(null);
                    } else {
                        user.username = userDetails.username || user.username;
                        user.email = userDetails.email || user.email;
                        user.fullname = userDetails.fullname || user.fullname;
                        user.role = userDetails.role || user.role;
                        user.save((err: any) => {
                            if (err) {
                                reject(err);
                            }
                            resolve(user._id);
                        });
                    }
                })
                .catch((err: any) => {
                    reject(err);
                });
        });
        
    }

}

