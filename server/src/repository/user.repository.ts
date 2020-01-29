import { User } from './../models/user';
import { MysqlConnection } from './../loaders/mysql';

/**
 * Users Repository (SQL request)
 */
export class UsersRepository {

    private static instance: UsersRepository;
    private connection: MysqlConnection = MysqlConnection.getInstance();

    private table: string = 'user';

    static getInstance() {
        if (!this.instance) {
            this.instance = new UsersRepository();
        }
        return this.instance;
    }

    private constructor() {
    }

    /**
     * Make a query to the database to retrieve all Users and return it in a promise.
     */
    findAll(): Promise<User[]> {
        return this.connection.query(`SELECT * from ${this.table}`)
          .then((results: any) => {
            return results.map((User: any) => new User(User));
          });
    }

    /**
     * Make a query to the database to retrieve one User by its id in parameter. 
     * Return the User found in a promise.
     * @param id User id
     */
    findById(id: number): Promise<User> {
        return this.connection.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id])
          .then((results: any) => new User(results[0]));
    }

    /**
     * Make a query to the database to retrieve one User by its email in parameter. 
     * Return the User found in a promise.
     * @param email User id
     */
    findByMail(email: string): Promise<User> {
      return this.connection.query(`SELECT * FROM ${this.table} WHERE email = ?`, [email])
        .then((results: any) => new User(results[0]));
  }


    /**
     * Make a query to the database to insert a new User and return the created User in a promise.
     * @param user User to create
     */
    insert(user: User) {
      return this.connection.query(
        `INSERT INTO ${this.table} (firstname, lastname, email, password, address, zip, city, role) VALUES (?,?,?,?,?,?,?,?)`,
        [user.firstname, user.lastname, user.email, user.password,user.address,user.zip,user.city, user.role ]
      ).then((result: any) => {
        // After an insert the insert id is directly passed in the promise
        return this.findById(result.insertId);
      });
    }

    /**
     * Make a query to the database to update an existing User and return the updated User in a promise.
     * @param user User to update
     */
    update(user: User) {
      return this.connection.query(
        `UPDATE ${this.table} SET firstname = ?, lastname = ?, email = ?, password = ?, address = ?, zip = ?, city = ?, role = ? WHERE id = ?`,
        [user.firstname, user.lastname,user.email, user.password, user.address, user.zip, user.city, user.role, user.id ]
      ).then(() => {
        return this.findById(user.id);
      });
    }

    /**
     * Make a query to the database to delete an existing User and return an empry promise
     * @param id User id to delete
     */
    delete(id: number): Promise<any> {
      return this.connection.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
    }
}
