import * as express from 'express';
import { EventDocument, Event, Events} from '../../db/models/event.model';
import { EventService } from '../services/eventService';
import {ErrorDTO} from '../DTO/ErrorDTO';
const BASE_URI = '/event';

module EventModule {
    export class EventController {
        eventService: EventService;
        router: express.Router;
        app: express.Application;
        auth: any;
        constructor(app: express.Application, router: express.Router, auth: any) {
            this.router = router;
            this.app = app;
            this.auth = auth;
            this.eventService = new EventService();
            this.configureController();
        }

        private configureController() {
            this.router.route(`${BASE_URI}`).post(this.auth, (req: express.Request,
                res: express.Response,
                next: express.NextFunction) => {
                try {               
                    let event = new Event(req.body);
                    console.log(event);
                    this.eventService.saveEvent(event)
                    .then((eventId: any) => {
                        res.status(200).json({id: eventId, message: 'event created'});
                    })
                    .catch((err: any) => {                        
                        res.status(500).json(new ErrorDTO(err, 1));
                    });
                } catch (e) {
                    res.status(500).json(new ErrorDTO(e));
                }
         });
    }
  }
}
export = EventModule;