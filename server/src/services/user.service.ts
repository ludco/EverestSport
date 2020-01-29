import { UsersRepository } from './../repository/user.repository';
import { User } from 'src/models/user';
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les post doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controller
 */
export class UsersService {

  // Make service => singletonTransformation de notre service en singleton
  private static instance: UsersService;
  static getInstance() {
    if (!this.instance) {
      this.instance = new UsersService();
    }
    return this.instance;
  }

  // Un singleton est une class ayant une instance unique a travers toute l'app
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
   * @param id post id
   */
  getById(id: number): Promise<User> {
    return this.repository.findById(id);
  }

  /**
   * Update the post in parameter and return a promise which contains the updated post.
   * @param User post to update
   */
  update(user: any): Promise<User> {
    return this.repository.update(user);
  }

  /**
   * Delete the post related to the id in parameter. Return an empty promise.
   * @param id post id
   */
  delete(id: number): Promise<any> {
    return this.repository.delete(id);
  }
}
