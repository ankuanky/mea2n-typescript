import * as express from 'express';
import { EventDocument, Event , Events} from '../../db/models/event.model';
import Controller  from '../config/controller.config';
import { EventService } from '../services/eventService';
const BASE_URI = '/event';

module EventModule {
    export class EventController extends Controller {
        eventService: EventService;
        constructor(app: express.Application, router: express.Router) {
            super(app, router, Events);
            this.eventService = new EventService();
            this.configureController();
        }

        private configureController() {
            let router = super.getRouter();
            router.route(`${BASE_URI}`).post((req: express.Request,
                res: express.Response,
                next: express.NextFunction) => {
                console.log("userAA", req.body);
                let event = new Event(req.body);
                this.eventService.saveEvent(event);
                console.log(event);
                super.create(req, res, next, event);
            });
        }
    }
}
export = EventModule;