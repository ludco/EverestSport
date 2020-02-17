import { User } from './../models/user';
import { UsersService } from './../services/user.service';
import express, { Router, Request, Response, Application } from 'express';

/**
 * User Controller
 * @param app l'application express
 */
export const UsersController = (app: Application) => {

    const router: Router = express.Router();
    const usersService = UsersService.getInstance();

    /**
     * Return all users in JSON
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
     * Return only one user in JSON relative to its id
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
     * Update a user relative to its id and return the updated user in JSON.
     */
    router.put('/:id', (req: Request, res: Response) => {
        const user: User = req.body; 

        usersService.update(user).then(result => {
            res.send(result);
        })
            .catch(err => {
                console.log(err);
            })
    });

    /**
     * Delete a user relative to its id.
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


    // route
    app.use('/Users', router);
};
