import { CategoryRepository } from './../repository/Category.repository';
import { Category } from 'src/models/Category';

export class CategoryService {

  // Make service => singleton 
  private static instance: CategoryService;
  static getInstance() {
    if (!this.instance) {
      this.instance = new CategoryService();
    }
    return this.instance;
  }

  // singleton is a unique class in the whole app
  private repository: CategoryRepository;
  private constructor() {
    this.repository = CategoryRepository.getInstance();
  }

  // Business logic

  /**
   * Return a promise which contains an array of Categorys.
   */
  getAll(): Promise<Category[]> {
    return this.repository.findAll();
  }

  /**
   * Return a promise which contains the Category relative to the id in parameter.
   * @param id Category id
   */
  getById(id: number): Promise<Category> {
    return this.repository.findById(id);
  }

  /**
   * Create a new Category and return a promise which contains the created Category.
   * @param Category Category to create
   */
  create(Category: any): Promise<Category> {
    return this.repository.insert(Category);
  }

  /**
   * Update the Category in parameter and return a promise which contains the updated Category.
   * @param Category Category to update
   */
  update(Category: any): Promise<Category> {
    return this.repository.update(Category);
  }

  /**
   * Delete the Category related to the id in parameter. Return an empty promise.
   * @param id Category id
   */
  delete(id: number): Promise<any> {
    return this.repository.delete(id);
  }
}
