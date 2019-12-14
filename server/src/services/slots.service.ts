import { SlotsRepository } from './../repository/slots.repository';
import { Slot } from 'src/models/slot';
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les slot doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controller
 */
export class SlotsService {

    // Make service => singletonTransformation de notre service en singleton
    private static instance: SlotsService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new SlotsService();
        }
        return this.instance;
    }

    // Un singleton est une class ayant une instance unique a travers toute l'app
    private repository: SlotsRepository;
    private constructor() {
        this.repository = SlotsRepository.getInstance();
    }

    // Business logic

    /**
     * Return a promise which contains an array of posts.
     */
    getAll(): Promise<Slot[]> {
        return this.repository.findAll();
    }

    /**
     * Return a promise which contains the slot relative to the id in parameter.
     * @param date slot id
     */
    getByDate(date: string): Promise<Slot[]> {
      return this.repository.findByDate(date);
  }
    /**
     * Return a promise which contains the slot relative to the id in parameter.
     * @param id slot id
     */
    getById(id: number): Promise<Slot> {
        return this.repository.findById(id);
    }

    /**
     * Create a new slot and return a promise which contains the created slot.
     * @param slot slot to create
     */
    create(slot: any): Promise<Slot> {
      return this.repository.insert(slot);
    }

    /**
     * Update the slot in parameter and return a promise which contains the updated slot.
     * @param slot slot to update
     */
    update(slot: any): Promise<Slot> {
      return this.repository.update(slot);
    }

    /**
     * Delete the slot related to the id in parameter. Return an empty promise.
     * @param id slot id
     */
    delete(id: number): Promise<any> {
      return this.repository.delete(id);
    }
}
