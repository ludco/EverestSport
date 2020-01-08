import { Product } from './../models/product';
import { MysqlConnection } from './../loaders/mysql';

/**
 * Cette classe est un repository
 * C'est ici qu'on met tout les accès à la bdd
 * Attention, aucune logique javascript ne doit apparaitre ici.
 * Il s'agit seulement de la couche de récupération des données (requeêe sql)
 */
export class ProductsRepository {

    private static instance: ProductsRepository;
    private connection: MysqlConnection = MysqlConnection.getInstance();

    private table: string = 'product';

    static getInstance() {
        if (!this.instance) {
            this.instance = new ProductsRepository();
        }
        return this.instance;
    }

    private constructor() {
    }

    /**
     * Make a query to the database to retrieve all posts and return it in a promise.
     */
    findAll(): Promise<Product[]> {
        return this.connection.query(`SELECT * from ${this.table}`)
          .then((results: any) => {
            return results.map((product: any) => new Product(product));
          });
    }

     /**
     * Make a query to the database to retrieve products by category in parameter. 
     * Return the products found in a promise.
     * @param category products category
     */
    findByCategory(category: string): Promise<Product[]> {
      return this.connection.query(`SELECT * FROM ${this.table} WHERE category = ?`, [category])
      .then((results: any) => {
        return results.map((product: any) => new Product(product));
      });
    }

    /**
     * Make a query to the database to retrieve one post by its id in parameter. 
     * Return the post found in a promise.
     * @param id post id
     */
    findById(id: number): Promise<Product> {
        return this.connection.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id])
          .then((results: any) => new Product(results[0]));
    }


    /**
     * Make a query to the database to insert a new post and return the created post in a promise.
     * @param product post to create
     */
    insert(product: Product) {
      return this.connection.query(
        `INSERT INTO ${this.table} (name,description,photo, priceTTC) VALUES (?,?,?,?)`,
        [product.name, product.description,product.photo, product.priceTTC ]
      ).then((result: any) => {
        // After an insert the insert id is directly passed in the promise
        return this.findById(result.insertId);
      });
    }

    /**
     * Make a query to the database to update an existing post and return the updated post in a promise.
     * @param product post to update
     */
    update(product: Product) {
      return this.connection.query(
        `UPDATE ${this.table} SET name = ?, description = ?, priceTTC = ?, photo = ? WHERE id = ?`,
        [product.name, product.description,product.priceTTC, product.photo,  product.id ]
      ).then(() => {
        return this.findById(product.id);
      });
    }

    /**
     * Make a query to the database to delete an existing post and return an empry promise
     * @param id post id to delete
     */
    delete(id: number): Promise<any> {
      return this.connection.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
    }
}
