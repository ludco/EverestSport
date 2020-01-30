import { Product } from './../models/product';
import { MysqlConnection } from './../loaders/mysql';

/**
 * Products Repository (SQL request)
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
     * Make a query to the database to retrieve all products and return it in a promise.
     */
    findAll(): Promise<Product[]> {
        return this.connection.query(`SELECT * from ${this.table} ORDER BY id DESC`)
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
      return this.connection.query(`SELECT * FROM ${this.table} WHERE category = ? ORDER BY id DESC`, [category])
      .then((results: any) => {
        return results.map((product: any) => new Product(product));
      });
    }

    /**
     * Make a query to the database to retrieve one product which is the big promo. 
     * Return the product found in a promise.
     */
    findBigPromo(): Promise<Product> {
      return this.connection.query(`SELECT * FROM ${this.table} WHERE isBigPromo = 1`)
        .then((results: any) => new Product(results[0]));
  }

    /**
     * Make a query to the database to retrieve one product by its id in parameter. 
     * Return the product found in a promise.
     * @param id product id
     */
    findById(id: number): Promise<Product> {
        return this.connection.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id])
          .then((results: any) => new Product(results[0]));
    }


    /**
     * Make a query to the database to insert a new product and return the created product in a promise.
     * @param product product to create
     */
    insert(product: Product) {
      return this.connection.query(
        `INSERT INTO ${this.table} (name, description, photo, priceTTC, promo, category, isBigPromo) VALUES (?,?,?,?,?,?,?)`,
        [product.name, product.description,product.photo, product.priceTTC, product.promo, product.category, product.isBigPromo ]
      ).then((result: any) => {
        // After an insert the insert id is directly passed in the promise
        return this.findById(result.insertId);
      });
    }

    /**
     * Make a query to the database to update an existing product and return the updated product in a promise.
     * @param product product to update
     */
    update(product: Product) {
      return this.connection.query(
        `UPDATE ${this.table} SET name = ?, description = ?, priceTTC = ?, photo = ?, promo =?, category = ?, isBigPromo = ? WHERE id = ?`,
        [product.name, product.description,product.priceTTC, product.photo, product.promo, product.category, product.isBigPromo, product.id ]
      ).then(() => {
        return this.findById(product.id);
      });
    }

    /**
     * Make a query to the database to delete an existing product and return an empry promise
     * @param id product id to delete
     */
    delete(id: number): Promise<any> {
      return this.connection.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
    }
}
