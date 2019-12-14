import { Reservation } from '../models/reservation';

import express, { Router, Request, Response, Application } from 'express';
import { ReservationService } from './../services/reservation.service';


/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controller est la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const ReservationController = (app: Application) => {

    const router: Router = express.Router();
    const reservationService = ReservationService.getInstance();

    /**
     * Return all reservations in JSON
     */
    router.get('/', (req: Request, res: Response) => {
      const date = req.query.date;

      if (!date) {
        reservationService.getAll().then(results => {
            res.send(results);
        })
        .catch(err => {
          console.log(err);
        });
      }
      else {
        reservationService.getByDate(date).then(result => {
              res.send(result);
          })
          .catch(err => {
            console.log(err);
          });
        }
    });

    /**
     * Return only one reservation in JSON relative to its id
     */
    router.get('/:id', (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      reservationService.getById(id).then(result => {
            res.send(result);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Create a new reservation from a JSON body and return the created reservation in JSON.
     */
    router.post('/', (req: Request, res: Response) => {
      const reservation: Reservation = req.body; // Automatically transform in a reservation object

      reservationService.create(reservation).then(result => {
            res.send(result);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Update a reservation relative to its id and return the updated reservation in JSON.
     */
    router.put('/:id', (req: Request, res: Response) => {
      const reservation: Reservation = req.body; // req.params.id is automatically set into the body

      reservationService.update(reservation).then(result => {
            res.send(result);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Delete a reservation relative its id.
     */
    router.delete('/:id', (req: Request, res: Response) => {
      const id = parseInt(req.params.id);

      reservationService.delete(id).then(result => {
            res.send();
        })
        .catch(err => {
          console.log(err);
        })
    });

    app.use('/reservation', router);
};
