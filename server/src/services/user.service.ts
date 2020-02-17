import { UsersRepository } from './../repository/user.repository';
import { User } from 'src/models/user';

export class UsersService {

  // Make service => singleton
  private static instance: UsersService;
  static getInstance() {
    if (!this.instance) {
      this.instance = new UsersService();
    }
    return this.instance;
  }

  private repository: UsersRepository;
  private constructor() {
    this.repository = UsersRepository.getInstance();
  }

  // Business logic

  /**
   * Return a promise which contains an array of Users.
   */
  getAll(): Promise<User[]> {
    return this.repository.findAll();
  }

  /**
   * Return a promise which contains the User relative to the id in parameter.
   * @param id user id
   */
  getById(id: number): Promise<User> {
    return this.repository.findById(id);
  }

  /**
   * Update the user in parameter and return a promise which contains the updated user.
   * @param User user to update
   */
  update(user: any): Promise<User> {
    return this.repository.update(user);
  }

  /**
   * Delete the user related to the id in parameter. Return an empty promise.
   * @param id user id
   */
  delete(id: number): Promise<any> {
    return this.repository.delete(id);
  }
}
