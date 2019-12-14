import { Slot } from './../models/slot';
import { MysqlConnection } from './../loaders/mysql';

/**
 * Cette classe est un repository
 * C'est ici qu'on met tout les accès à la bdd
 * Attention, aucune logique javascript ne doit apparaitre ici.
 * Il s'agit seulement de la couche de récupération des données (requeêe sql)
 */
export class SlotsRepository {

    private static instance: SlotsRepository;
    private connection: MysqlConnection = MysqlConnection.getInstance();

    private table: string = 'slot';

    static getInstance() {
        if (!this.instance) {
            this.instance = new SlotsRepository();
        }
        return this.instance;
    }

    private constructor() {
    }

    /**
     * Make a query to the database to retrieve all slots and return it in a promise.
     */
    findAll(): Promise<Slot[]> {
        return this.connection.query(`SELECT * from ${this.table}`)
          .then((results: any) => {
            return results.map((slot: any) => new Slot(slot));
          });
    }

    /**
     * Make a query to the database to retrieve one slot by its id in parameter. 
     * Return the slot found in a promise.
     * @param id slot id
     */
    findById(id: number): Promise<Slot> {
        return this.connection.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id])
          .then((results: any) => new Slot(results[0]));
    }

    /**
     * Make a query to the database to retrieve one slot by its id in parameter. 
     * Return the slot found in a promise.
     * @param date slot id
     */
    findByDate(date : string): Promise<Slot[]> {
      return this.connection.query(`SELECT s.* FROM ${this.table} s JOIN period p ON
      s.periodId = p.id WHERE ?>p.startDate AND ?<p.endDate AND DAYOFWEEK(?)=s.jour 
      `, [date,date,date])
        .then((results: any) => {
          return results.map((slot: any) => new Slot(slot));
          });
  }


    /**
     * Make a query to the database to insert a new slot and return the created slot in a promise.
     * @param slot slot to create
     */
    insert(slot: Slot) {
      return this.connection.query(
        `INSERT INTO ${this.table} (jour, start, end, places) VALUES (?,?,?,?)`,
        [slot.jour, slot.start, slot.end, slot.places]
      ).then((result: any) => {
        // After an insert the insert id is directly passed in the promise
        return this.findById(result.insertId);
      });
    }

    /**
     * Make a query to the database to update an existing slot and return the updated slot in a promise.
     * @param slot slot to update
     */
    update(slot: Slot) {
      return this.connection.query(
        `UPDATE ${this.table} SET jour = ?, start = ?, end = ?, places = ? WHERE id = ?`,
        [slot.jour, slot.start, slot.end, slot.places, slot.id]
      ).then(() => {
        return this.findById(slot.id);
      });
    }

    /**
     * Make a query to the database to delete an existing slot and return an empry promise
     * @param id slot id to delete
     */
    delete(id: number): Promise<any> {
      return this.connection.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
    }
}
