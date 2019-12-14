import { Reservation } from '../models/reservation';
import { ReservationRepository } from '../repository/reservation.repository';


/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les reservation doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controller
 */
export class ReservationService {

    // Make service => singletonTransformation de notre service en singleton
    private static instance: ReservationService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new ReservationService();
        }
        return this.instance;
    }

    // Un singleton est une class ayant une instance unique a travers toute l'app
    private repository: ReservationRepository;
    private constructor() {
        this.repository = ReservationRepository.getInstance();
    }

    // Business logic

    /**
     * Return a promise which contains an array of posts.
     */
    getAll(): Promise<Reservation[]> {
        return this.repository.findAll();
    }

   
    /**
     * Return a promise which contains the reservation relative to the id in parameter.
     * @param id reservation id
     */
    getById(id: number): Promise<Reservation> {
        return this.repository.findById(id);
    }

    /**
     * Return a promise which contains the number of reservation relative to the date in parameter.
     * @param date reservation date
     */
    getByDate(date: string): Promise<any> {
      return this.repository.findByDate(date);
  }

    

    /**
     * Create a new reservation and return a promise which contains the created reservation.
     * @param reservation reservation to create
     */
    create(reservation: any): Promise<Reservation> {
      return this.repository.insert(reservation);
    }

    /**
     * Update the reservation in parameter and return a promise which contains the updated reservation.
     * @param reservation reservation to update
     */
    update(reservation: any): Promise<Reservation> {
      return this.repository.update(reservation);
    }

    /**
     * Delete the reservation related to the id in parameter. Return an empty promise.
     * @param id reservation id
     */
    delete(id: number): Promise<any> {
      return this.repository.delete(id);
    }
}
