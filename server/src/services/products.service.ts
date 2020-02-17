import { ProductsRepository } from './../repository/product.repository';
import { Product } from 'src/models/product';

export class ProductsService {

  // Make service => singleton 
  private static instance: ProductsService;
  static getInstance() {
    if (!this.instance) {
      this.instance = new ProductsService();
    }
    return this.instance;
  }

  // singleton is a unique class in the whole app
  private repository: ProductsRepository;
  private constructor() {
    this.repository = ProductsRepository.getInstance();
  }

  // Business logic

  /**
   * Return a promise which contains an array of products.
   */
  getAll(): Promise<Product[]> {
    return this.repository.findAll();
  }

  /**
   * Return a promise which contains the products relative to the category in parameter.
   * @param category products category
   */
  getByCategory(category: string): Promise<Product[]> {
    return this.repository.findByCategory(category);
  }

  /**
    * Return a promise which contains the product relative to the big Promo.
    */
  getBigPromo(): Promise<Product> {
    return this.repository.findBigPromo();
  }
  /**
   * Return a promise which contains the product relative to the id in parameter.
   * @param id product id
   */
  getById(id: number): Promise<Product> {
    return this.repository.findById(id);
  }

  /**
   * Create a new product and return a promise which contains the created product.
   * @param product product to create
   */
  create(product: any): Promise<Product> {
    return this.repository.insert(product);
  }

  /**
   * Update the product in parameter and return a promise which contains the updated product.
   * @param product product to update
   */
  update(product: any): Promise<Product> {
    return this.repository.update(product);
  }

  /**
   * Delete the product related to the id in parameter. Return an empty promise.
   * @param id product id
   */
  delete(id: number): Promise<any> {
    return this.repository.delete(id);
  }
}
