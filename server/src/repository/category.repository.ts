import { Category } from './../models/Category';
import { MysqlConnection } from './../loaders/mysql';

/**
 * Category Repository (SQL request)
 */
export class CategoryRepository {

    private static instance: CategoryRepository;
    private connection: MysqlConnection = MysqlConnection.getInstance();

    private table: string = 'category';

    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoryRepository();
        }
        return this.instance;
    }

    private constructor() {
    }

    /**
     * Make a query to the database to retrieve all Category and return it in a promise.
     */
    findAll(): Promise<Category[]> {
        return this.connection.query(`SELECT * from ${this.table} `)
          .then((results: any) => {
            return results.map((category: any) => new Category(category));
          });
    }

    /**
     * Make a query to the database to retrieve one Category by its id in parameter. 
     * Return the Category found in a promise.
     * @param id Category id
     */
    findById(id: number): Promise<Category> {
        return this.connection.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id])
          .then((results: any) => new Category(results[0]));
    }


    /**
     * Make a query to the database to insert a new Category and return the created Category in a promise.
     * @param Category Category to create
     */
    insert(category: Category) {
      return this.connection.query(
        `INSERT INTO ${this.table} (name, season) VALUES (?,?)`,
        [category.name, category.season ]
      ).then((result: any) => {
        // After an insert the insert id is directly passed in the promise
        return this.findById(result.insertId);
      });
    }

    /**
     * Make a query to the database to update an existing Category and return the updated Category in a promise.
     * @param Category Category to update
     */
    update(category: Category) {
      return this.connection.query(
        `UPDATE ${this.table} SET name = ?, season = ? WHERE id = ?`,
        [category.name, category.season, category.id ]
      ).then(() => {
        return this.findById(category.id);
      });
    }

    /**
     * Make a query to the database to delete an existing Category and return an empry promise
     * @param id Category id to delete
     */
    delete(id: number): Promise<any> {
      return this.connection.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
    }
}
