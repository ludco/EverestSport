import { UsersRepository } from '../repository/user.repository';
import { User } from './../models/user'
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import randomBytes from 'randombytes';


export class AuthService {


    // A non-initialized user
    public connectedUser: User | undefined;

    private static instance: AuthService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new AuthService();
        }
        return this.instance;
    }


    private repository: UsersRepository;
    private constructor() {
        this.repository = UsersRepository.getInstance();
    }

    /**
     * Hash the password to register the new user
     * @param user 
     */
    async signup(user: User): Promise<User> {
        const salt = randomBytes(32);
        // Hash the password with argon2
        user.password = await argon2.hash(user.password, { salt });
        return this.repository.insert(user);
    }

    /**
     * Check if user can log in
     * @param email 
     * @param password 
     */
    async signin(email: string, password: string) {
        const user = await this.repository.findByMail(email);
        // Check if email exist in dB
        if (!user) {
            throw new Error('Informations invalides');
        }
        // Check if hashed password match
        const isValid = await argon2.verify(user.password, password);
        if (!isValid) {
            throw new Error('Informations invalides');
        }
        // create a token
        const userToken = {
            id: user.id,
            email: user.email,
        };
        // Check if a secret is defined
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('Pas de secret setup');
        }
        // Encrypt the token
        const token = jwt.sign(userToken, secret);
        return { token, email }
    }

    /**
     * Verify the token
     * @param req 
     * @param res 
     * @param next 
     */
    async verifyToken(req: Request, res: Response, next: Function) {
        const authorization = req.headers.authorization;
        const bearerToken = authorization?.split(' ')[1];
        if (!bearerToken) {
            res.sendStatus(401);
        }
        else {
            try {
                // get the secret
                const secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : '';
                // parsing token
                const results: any = await jwt.verify(bearerToken, secret);
                // get the matching user
                const user = await UsersRepository.getInstance().findByMail(results.email);
                // put the user in the request
                req.user = {
                    ...user,
                    password: undefined
                };
                next();
            }
            catch (err) {
                res.sendStatus(401)
            }
        }
    }
}

