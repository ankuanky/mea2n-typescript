// ```
// routes.js
// (c) 2016 David Newman
// david.r.niciforovic@gmail.com
// routes.js may be freely distributed under the MIT license
// ```

let request = require('request');
import * as express from 'express';
let paginate = require('express-paginate');



// Load our `API` routes for user authentication
import * as authentication from "../controllers/auth.controller";
// Load our `API` router for the `validation` service
import * as validation from "../controllers/validation.controller";
import * as user from "../controllers/user.controller";
import { ServerEvent, IServerEvent } from '../handlers/event.handler';

import * as event from '../controllers/event.controller'

// */app/routes.js*

// ## Node API Routes

// Define routes for the Node backend

export default (app: express.Application,
                passport: any,
                ServerEventEmitter: ServerEvent.EventEmitter) => {

  let router: express.Router;
  // Get an instance of the `express` `Router`
  router = express.Router();

  // Keep track of `http` requests
  let numReqs: number = 0;

  // ### Express Middlware to use for all requests
  router.use((req: express.Request,
              res: express.Response,
              next: express.NextFunction) => {
    if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {

      let event: IServerEvent = {
        type: ServerEvent.NotifyRequest,
        from: process.pid
      };
      ServerEventEmitter.emit(event.type, event, () => {
        numReqs++;
        console.log('I sense a disturbance in the force...');
        console.log(`{${event.from}} - requests served since last restart: ${numReqs}`);
      });
    }
    // Make sure we go to the next routes and don't stop here...
    next();
  });

  // Define a middleware function to be used for all secured routes
  let auth = (req: express.Request,
              res: express.Response,
              next: express.NextFunction) => {

    if (!req.isAuthenticated())
      res.send(401);

    else
      next();
  };

  // Define a middleware function to be used for all secured administration
  // routes
  let admin = (req: express.Request,
               res: express.Response,
               next: express.NextFunction) => {

    if (!req.isAuthenticated() || req.user.role !== 'admin')
      res.send(401);

    else
      next();
  };



  // ### Server Routes

  // Handle things like API calls,

  // #### Authentication routes

  // Pass in our Express app and Router.
  // Also pass in auth & admin middleware and Passport instance
  let authRoutes: authentication.AuthController = new authentication.AuthController(this.app, router, passport, auth, admin);

  // #### RESTful API Routes

  // Pass in our Express app and Router
  let validationRoutes: validation.ValidationController = new validation.ValidationController(this.app, router);

  let userRoutes: user.UserController = new user.UserController(this.app, router);
  let eventRoutes: event.EventController= new event.EventController(this.app,router);

  // All of our routes will be prefixed with /api
  app.use('/api', router);

  // ### Frontend Routes

  // Serve static front-end assets
  app.use(express.static('dist/client'));
  app.use(paginate.middleware(2, 5));



  // Route to handle all Angular requests
  app.get('*', (req, res) => {

    // Load our src/app.html file
    //** Note that the root is set to the parent of this folder, ie the app root **
    res.sendFile('/dist/client/index.html', { root: __dirname + "/../../"});
  });



  // Use `router` middleware
  app.use(router);
};
