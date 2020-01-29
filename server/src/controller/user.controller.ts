import { User } from './../models/user';
import { UsersService } from './../services/user.service';
import express, { Router, Request, Response, Application } from 'express';

/**
 * Priduct Controller
 * @param app l'application express
 */
export const UsersController = (app: Application) => {

    const router: Router = express.Router();
    const usersService = UsersService.getInstance();

    /**
     * Return all Users in JSON
     */
    router.get('/', (req: Request, res: Response) => {
        usersService.getAll().then(results => {
            res.send(results);
        })
            .catch(err => {
                console.log(err);
            })
    });

    /**
     * Return only one User in JSON relative to its id
     */
    router.get('/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        usersService.getById(id).then(result => {
            res.send(result);
        })
            .catch(err => {
                console.log(err);
            })
    });


    /**
     * Update a User relative to its id and return the updated post in JSON.
     */
    router.put('/:id', (req: Request, res: Response) => {
        const user: User = req.body; // req.params.id is automatically set into the body

        usersService.update(user).then(result => {
            res.send(result);
        })
            .catch(err => {
                console.log(err);
            })
    });

    /**
     * Delete a User relative its id.
     */
    router.delete('/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id);

        usersService.delete(id).then(result => {
            res.send();
        })
            .catch(err => {
                console.log(err);
            })
    });

    app.use('/Users', router);
};
