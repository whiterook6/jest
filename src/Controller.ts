import {Connection} from "mysql2/promise";
import { Database } from "./Database";

export abstract class Controller {
  public readonly connection?: Connection;

  protected constructor(connection?: Connection) {
    this.connection = connection;
  }

  public query = async (sql: string, params: any = []) => {
    if (this.connection) {
      return this.connection.query(sql, params);
    } else {
      return Database.getPool().query(sql, params);
    }
  };
}
