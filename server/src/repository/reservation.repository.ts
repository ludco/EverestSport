import { Reservation } from '../models/reservation';
import { MysqlConnection } from '../loaders/mysql';

/**
 * Cette classe est un repository
 * C'est ici qu'on met tout les accès à la bdd
 * Attention, aucune logique javascript ne doit apparaitre ici.
 * Il s'agit seulement de la couche de récupération des données (requeêe sql)
 */
export class ReservationRepository {

    private static instance: ReservationRepository;
    private connection: MysqlConnection = MysqlConnection.getInstance();

    private table: string = 'reservation';

    static getInstance() {
        if (!this.instance) {
            this.instance = new ReservationRepository();
        }
        return this.instance;
    }

    private constructor() {
    }

    /**
     * Make a query to the database to retrieve all reservations and return it in a promise.
     */
    findAll(): Promise<Reservation[]> {
        return this.connection.query(`SELECT * from ${this.table}`)
          .then((results: any) => {
            return results.map((reservation: any) => new Reservation(reservation));
          });
    }
     

    /**
     * Make a query to the database to retrieve one reservation by its id in parameter. 
     * Return the reservation found in a promise.
     * @param id reservation id
     */
    findById(id: number): Promise<Reservation> {
        return this.connection.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id])
          .then((results: any) => new Reservation(results[0]));
    }


    /**
     * Make a query to the database to retrieve the number of reservations with its date in parameter. 
     * Return number found in a promise.
     * @param date reservation date
     */
    findByDate(date : string): Promise<any> {
      return this.connection.query(`SELECT COUNT(id) as alreadyRes, slotId, date FROM ${this.table} 
      WHERE date=? GROUP BY slotId`, [date])
        .then((results: any) => {
          return results;
          });
  }

    /**
     * Make a query to the database to insert a new reservation and return the created reservation in a promise.
     * @param reservation reservation to create
     */
    insert(reservation: Reservation) {
      return this.connection.query(
        `INSERT INTO ${this.table} (date, slotID) VALUES (?,?)`,
        [reservation.date, reservation.slotId]
      ).then((result: any) => {
        // After an insert the insert id is directly passed in the promise
        return this.findById(result.insertId);
      });
    }

    /**
     * Make a query to the database to update an existing reservation and return the updated reservation in a promise.
     * @param reservation reservation to update
     */
    update(reservation: Reservation) {
      return this.connection.query(
        `UPDATE ${this.table} SET date = ? WHERE id = ?`,
        [reservation.date, reservation.id]
      ).then(() => {
        return this.findById(reservation.id);
      });
    }

    /**
     * Make a query to the database to delete an existing reservation and return an empry promise
     * @param id reservation id to delete
     */
    delete(id: number): Promise<any> {
      return this.connection.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
    }
}
