import * as express from 'express';
import { IUser, User, UserDocument, Users } from '../../db/models/user.model';
import Controller  from '../config/controller.config';
import { UserService } from '../services/user.service.ts';
const BASE_URI = '/user';

module UserModule {
    export class UserController extends Controller {
        userService: UserService;
        constructor(app: express.Application, router: express.Router) {
            super(app, router, Users);
            this.userService = new UserService();
            // Configure our router/controller;
            this.configureController();
        }
        
        private configureController() {
            let router = super.getRouter();

            // Configure routes
            router.get(`${BASE_URI}/page/:page`, /*this.auth,*/(req: express.Request,
                res: express.Response,
                next: express.NextFunction) => {
                let page = { page: req.params.page };
                let itemsPerPage = 5;
                let currentPage = Number(page.page);
                let pageNumber = currentPage - 1;
                let skip = (itemsPerPage * pageNumber);
                let limit = (itemsPerPage * pageNumber) + itemsPerPage;
                let jsonOb = this.userService.userList(page, itemsPerPage, currentPage, pageNumber, skip, limit);
                res.send(jsonOb);
            });

            router.route(BASE_URI).post((req: express.Request,
                res: express.Response,
                next: express.NextFunction) => {
                console.log("userAA", req.body);
                let user = new User(req.body);
                console.log(user);                 
                super.create(req, res, next, user);
            });


            router.route(`${BASE_URI}/:user_id`)
                .get((req: express.Request,
                    res: express.Response,
                    next: express.NextFunction) => {
                    let id = { _id: req.params.user_id };
                    super.getOne(req, res, next, id);
                })
                .delete((req: express.Request,
                    res: express.Response,
                    next: express.NextFunction) => {
                    let id = { _id: req.params.user_id };
                    super.deleteOne(req, res, next, id);
                })
                .put((req: express.Request,
                    res: express.Response,
                    next: express.NextFunction) => {
                    let id = { _id: req.params.user_id };
                    let model = (user) => {

                        if (req.body.local.email)
                            user.local.email = req.body.local.email;

                        if (req.body.local.username)
                            user.local.username = req.body.local.username;

                        if (req.body.local.lastname)
                            user.local.lastname = req.body.local.lastname;

                        if (req.body.role)
                            user.role = req.body.role;

                        if (req.body.local.region_id)
                            user.local.region_id = req.body.local.region_id;

                        if (req.body.local.companie_id)
                            user.local.companie_id = req.body.local.companie_id;

                    };

                    super.updateOne(req, res, next, id, model);
                })
        }
    }

}

export =  UserModule;