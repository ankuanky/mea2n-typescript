"use strict";

import * as express from 'express';
import { IUser, User, UserDocument, Users } from '../../db/models/user.model';
import { UserResponseDTO }  from '../DTO/UserResponseDTO';
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
        console.log(newUser);
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
                    let user = new User(newUser);
//                    user.username = newUser.username;
//                    user.email = newUser.email;
//                    user.fullname = newUser.fullname || '';
//                    user.role = newUser.role || 'ROLE_USER';
//                    user.password = user.generateHash(newUser.password);
                    Users.create(user, (err: any, data: any) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        }
                        console.log(data);
                        resolve(data._id);
                    });
                }
            });
        });

    }
    public getUser(id: any) {
        return new Promise((resolve, reject) => {
            Users.findOne({ _id: id }, (err: any, user: User) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                let userResponse = new UserResponseDTO(user);
                //console.log(userResponse);
                resolve(userResponse.getUserDetails());
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
        return new Promise((resolve, reject) => {
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

