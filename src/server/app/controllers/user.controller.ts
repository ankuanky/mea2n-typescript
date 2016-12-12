import * as express from 'express';
import { IUser, User, UserDocument, Users } from '../../db/models/user.model';
import Controller  from '../config/controller.config';
import { UserService } from '../services/user.service.ts';
const BASE_URI = '/user';

module UserModule {
    export class UserController {
        userService: UserService;
        app: express.Application;
        admin: any;
        router: express.Router;
        constructor(app: express.Application, router: express.Router, admin: any) {
            this.userService = new UserService();
            this.app = app;
            this.router = router;
            this.admin = admin;
            // Configure our router/controller;
            this.configureController();
        }

        private configureController() {

            // Configure routes
            this.router.get(`${BASE_URI}/page/:page`, this.admin, (req: express.Request,
                res: express.Response,
                next: express.NextFunction) => {
                try {
                    let page = { page: req.params.page };
                    let itemsPerPage = 5;
                    let currentPage = Number(page.page);
                    let pageNumber = currentPage - 1;
                    let skip = (itemsPerPage * pageNumber);
                    let limit = (itemsPerPage * pageNumber) + itemsPerPage;
                    this.userService.userList(page, itemsPerPage, currentPage, pageNumber, skip, limit)
                    .then((data: any) => {
                        res.status(200);
                        res.send(data);
                     })
                    .catch((err: any) => {
                        res.status(500);
                        res.json({message: err, status: 0});
                     });
                    
                } catch(e) {
                    res.status(500);
                    res.json({message: e, status: 0});
                }
                
            });
            //controller for saving new user details
            this.router.post(BASE_URI, this.admin, (req: express.Request,
                res: express.Response,
                next: express.NextFunction) => {
                console.log("userAA", req.body);
                let user = new User(req.body);
                try {
                    this.userService.saveUser(user)
                    .then((userId: any) => {
                            if(userId) {
                                res.status(200);
                                res.json({ status: 1, id: userId, message: 'user created' });
                            } else {
                                res.status(226);
                                res.json({ message: 'user with same username or email already exists', status: 2 });                       
                            }
                     })
                    .catch((err: any) => {
                        res.status(500);
                        res.json({status: 0, message: err});
                     });
                    
                } catch (e) {
                    res.status(500);
                    res.json(e);
                }
            });

            //controller for getting user details
            this.router.get(`${BASE_URI}/:user_id`, this.admin, (req: express.Request,
                res: express.Response,
                next: express.NextFunction) => {
                try {
                    this.userService.getUser(req.params.user_id)
                    .then((user: any) => {
                        user? res.status(200): res.status(204);
                        res.json(user);
                    })
                    .catch((err: any) => {
                        res.status(500);
                        res.json({status: 0, message: err});
                    });
                    
                } catch(e) {
                    res.status(500);
                    res.json({status: 0, message: e}); 
                }
            });

            //controller for deleting user details
            this.router.delete(`${BASE_URI}/:user_id`, this.admin, (req: express.Request,
                res: express.Response,
                next: express.NextFunction) => {
                try {
                    let id = req.params.user_id;              
                    this.userService.deleteUser(id)
                    .then((userId: any) => {
                        if(userId) {
                            res.status(200);
                            res.json({ status: 1, id: userId, message: 'user deleted' });
                        } else {
                            res.status(200);
                            res.json({ status: 2, message: 'user does not exists' });
                        }
                     })
                    .catch((err: any) => {
                        res.status(500);
                        res.json({status: 0, message: err});
                    });
                    
               } catch(e) {
                    res.status(500);
                    res.json({status: 0, message: e});    
               }
            });

            //controller for updating user details
            this.router.put(`${BASE_URI}/:user_id`, this.admin, (req: express.Request,
                res: express.Response,
                next: express.NextFunction) => {
                try {
                    this.userService.updateUser(req.params.user_id, req.body)
                    .then((userId: any) => {
                        res.status(200);
                        res.json({ status: 1, id: userId, message: 'user details updated' });
                     })
                    .catch((err: any) => {
                        res.status(500);
                        res.json({status: 0, message: err});
                     });
                } catch(e) {
                    res.status(500);
                    res.json({status: 0, message: e});
                }
            });
        }
    }
}

export = UserModule;