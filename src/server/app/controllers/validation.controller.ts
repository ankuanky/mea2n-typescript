'use strict';
import * as express from 'express';
// Load `User` `interfaces`, `class`, and `model`
import { IUser, User, UserDocument, Users } from '../../db/models/user.model';
import Controller  from '../config/controller.config';
import { ValidationService } from '../services/validation.service';

const BASE_URI = '/validate';

module Validation {
    export class ValidationController extends Controller {
        validationService: ValidationService;
        constructor(app: express.Application, router: express.Router) {
            super(app, router, User);
            this.validationService = new ValidationService();
            // Configure our router;
            this.configureController();
        }
        
        private configureController() {
          let router = super.getRouter();
          console.log('router' + router);
          // Configure routes
          router.route(`${BASE_URI}/username/:username`)
            .get((req: express.Request,
                  res: express.Response,
                  next: express.NextFunction) => {
                this.validationService.validateUser(req, res);
            });
        }
    }
}

export = Validation;