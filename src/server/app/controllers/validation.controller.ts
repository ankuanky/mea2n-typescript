'use strict';
import * as express from 'express';
// Load `User` `interfaces`, `class`, and `model`
import { IUser, User, UserDocument, Users } from '../../db/models/user.model';
import Controller  from '../config/controller.config';
import { ValidationService } from '../services/validation.service';

const BASE_URI = '/validate';

module Validation {
    export class ValidationController {
        validationService: ValidationService;
        router: express.Router;
        app: express.Application;
        constructor(app: express.Application, router: express.Router) {
            this.router = router;
            this.app = app;
            this.validationService = new ValidationService();
            // Configure our router;
            this.configureController();
        }
        
        private configureController() {;
              console.log('router' + router);
              // Configure routes
              this.router.route(`${BASE_URI}/username/:username`)
                .get((req: express.Request,
                      res: express.Response,
                      next: express.NextFunction) => {
                    try {
                        this.validationService.validateUser(req.params.username)
                        .then((usernameTaken: boolean) => {
                            usernameTaken? res.status(226): res.status(200);
                            res.json({usernameTaken: usernameTaken});
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
        }
    }
}

export = Validation;