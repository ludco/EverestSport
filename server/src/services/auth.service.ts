import { UsersRepository } from '../repository/user.repository';
import { User } from './../models/user'
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import randomBytes from 'randombytes';




export class AuthService {

    // Token, type string or buffer
    private secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : '';
    // A non-initialized admin
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


    // Hash the password to register the new admin
    async signup(user: User): Promise<User> {
        const salt = randomBytes(32);
        // Hash the password with argon2
        user.password = await argon2.hash(user.password,  { salt });
        return this.repository.insert(user);
    }
}