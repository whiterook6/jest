import mysql, { Connection } from "mysql2/promise";

export const getConnection = async (): Promise<Connection> => {
  return mysql.createConnection({
    database: process.env.DB_NAME!,
    host: process.env.DB_HOST!,
    user: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!
  });
};
