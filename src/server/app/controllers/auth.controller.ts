'use strict';
import * as express from 'express';
// Load `User` `interfaces`, `class`, and `model`
import { IUser, User, UserDocument, Users } from '../../db/models/user.model';
import Controller from '../config/controller.config';
import { AuthService } from '../services/auth.service';
const BASE_URI = '/auth';
module Authentication {
    export class AuthController extends Controller { 
        authService: AuthService;
        auth: any;
        admin: any;
        constructor(app: express.Application,
                    router: express.Router,
                    passport: any,
                    auth: any,
                    admin: any) {
            super(app, router, User);
            this.auth = auth;
            this.admin = admin;
            //instantiate the AuthService to use inside controllers
            this.authService = new AuthService(passport, auth, admin);
            //register the controllers/routes
            this.configureRoutes();
            
                    
        }
        private configureRoutes() {
            let router = super.getRouter();
            // Configure routes
          router.route(`${BASE_URI}/authenticate`)
            .get((req: express.Request,
                  res: express.Response,
                  next: express.NextFunction) => {
              res.send(req.isAuthenticated() ? req.user : '0');
            });
          router
            .delete(`${BASE_URI}/delete/:uid`, this.admin, (req: express.Request,
                                                            res: express.Response) => {
              this.authService.delete(req, res);
            });
          router.route(`${BASE_URI}/login`)
            .post((req, res, next) => {
              this.authService.login(req, res, next);
            });
          router.route(`${BASE_URI}/logout`)
            .post((req, res, next) => {
              this.authService.logout(req, res);
            });
          router.route(`${BASE_URI}/register`)
            .post((req, res, next) => {
              this.authService.register(req, res, next);
            });
          router
            .get(`${BASE_URI}/session`, this.auth, (req: express.Request,
                                                    res: express.Response) => {
              this.authService.getSessionData(req, res);
            });
                       
        }
    }
}
export = Authentication;