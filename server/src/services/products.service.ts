import { ProductsRepository } from './../repository/product.repository';
import { Product } from 'src/models/product';
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les post doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controller
 */
export class ProductsService {

    // Make service => singletonTransformation de notre service en singleton
    private static instance: ProductsService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new ProductsService();
        }
        return this.instance;
    }

    // Un singleton est une class ayant une instance unique a travers toute l'app
    private repository: ProductsRepository;
    private constructor() {
        this.repository = ProductsRepository.getInstance();
    }

    // Business logic

    /**
     * Return a promise which contains an array of posts.
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
     * Return a promise which contains the post relative to the id in parameter.
     * @param id post id
     */
    getById(id: number): Promise<Product> {
        return this.repository.findById(id);
    }

    /**
     * Create a new post and return a promise which contains the created post.
     * @param product post to create
     */
    create(product: any): Promise<Product> {
      return this.repository.insert(product);
    }

    /**
     * Update the post in parameter and return a promise which contains the updated post.
     * @param product post to update
     */
    update(product: any): Promise<Product> {
      return this.repository.update(product);
    }

    /**
     * Delete the post related to the id in parameter. Return an empty promise.
     * @param id post id
     */
    delete(id: number): Promise<any> {
      return this.repository.delete(id);
    }
}
