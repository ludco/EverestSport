import { Slot } from '../models/slot';
import { SlotsService } from '../services/slots.service';
import express, { Router, Request, Response, Application } from 'express';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controller est la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const SlotsController = (app: Application) => {

    const router: Router = express.Router();
    const slotsService = SlotsService.getInstance();

   
    /**
     * Return all slots in JSON
     */
    router.get('/', (req: Request, res: Response) => {
      const date = req.query.date;

      if(!date) {
      slotsService.getAll().then(results => {
            res.send(results);
        })
        .catch(err => {
          console.log(err);
        });
      }
      else{
        slotsService.getByDate(date).then(result => {
          res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
    
      }
    });

    /**
     * Return all slots in JSON where date is ok
     */
   /*  router.get('/:date', (req: Request, res: Response) => {
      const date = req.params.date;
      slotsService.getByDate(date).then(results => {
            res.send(results);
        })
        .catch(err => {
          console.log(err);
        })
    }); */

    /**
     * Return only one slot in JSON relative to its id
     */
    router.get('/:id', (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      slotsService.getById(id).then(result => {
            res.send(result);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Create a new slot from a JSON body and return the created slot in JSON.
     */
    router.post('/', (req: Request, res: Response) => {
      const slot: Slot = req.body; // Automatically transform in a Slot object

      slotsService.create(slot).then(result => {
            res.send(result);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Update a slot relative to its id and return the updated slot in JSON.
     */
    router.put('/:id', (req: Request, res: Response) => {
      const slot: Slot = req.body; // req.params.id is automatically set into the body

      slotsService.update(slot).then(result => {
            res.send(result);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Delete a slot relative its id.
     */
    router.delete('/:id', (req: Request, res: Response) => {
      const id = parseInt(req.params.id);

      slotsService.delete(id).then(result => {
            res.send();
        })
        .catch(err => {
          console.log(err);
        })
    });

    app.use('/slots', router);
};
