import { AuthService } from '../services/auth.service';
import express, { Router, Request, Response, Application } from 'express';
import { User } from './../models/user';


export const AuthController = (app: Application) => {

    const router: Router = express.Router();
    const authService = AuthService.getInstance();


    /**
      * Register an user
      */
    router.post('/signup', (req: Request, res: Response) => {
        const user: User = req.body;
        // post the new user in dB and return it... without password !!
        authService.signup(user).then((registeredUser: User) => {
            res.send({
                ...registeredUser,
                password: ''
            });
        })
            .catch(err => {
                console.log(err);
            })
    });

    /** 
      * Log a user
      */
    router.post('/signin', (req: Request, res: Response) => {
        const user: User = req.body;
        // Make the verifications
        authService.signin(user.email, user.password).then((results: any) => {
            res.send({
                token: results.token,
                email: results.email
            });
        })
            .catch(err => {
                console.log(err)
                res.sendStatus(401);
            })
    });

    /**
     * Get connected admin in relation with token
     */
    router.get('/me', authService.verifyToken, (req: Request, res: Response) => {
        res.send(req.user);
    });

    // route
    app.use('/auth', router);
};
