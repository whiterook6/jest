import { Controller } from "./Controller";
import { Connection, OkPacket } from "mysql2/promise";
import { IColor } from "Color";

export class ColorController extends Controller {
  constructor(connection?: Connection) {
    super(connection);
  }

  public migrate = async () => {
    return this.query(`CREATE TABLE IF NOT EXISTS \`colors\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`name\` varchar(64) NOT NULL,
  \`value\` varchar(16) NOT NULL COMMENT 'Hex Value like #abcdef',
  PRIMARY KEY(\`id\`),
  INDEX(\`name\`),
  INDEX(\`value\`)
) ENGINE='InnoDB' COLLATE 'utf8mb4_general_ci';`);
  }

  public get = async (id: number) => {
    const [rows] = await this.query("SELECT `colors`.* FROM `colors` WHERE `id` = ? ORDER BY `id` ASC LIMIT 1", [id]);

    if (!Array.isArray(rows)) {
      throw new Error("Cannot find color");
    } else if (rows.length !== 1) {
      return null;
    } else {
      return rows[0] as IColor;
    }
  }

  public list = async () => {
    const [rows] = await this.query("SELECT `colors`.* FROM `colors` ORDER BY `id` ASC LIMIT 1");
    if (!Array.isArray(rows)){
      throw new Error("Error getting colors");
    } else {
      return rows as IColor[];
    }
  }

  public getBy = async (key: keyof IColor, value: string | number): Promise<IColor[]> => {
    const where = {
      [key]: value
    };
    const [rows] = await this.query("SELECT `colors`.* FROM `colors` WHERE ?", [where]);
    if (!Array.isArray(rows)){
      throw new Error("Cannot query colors");
    } else {
      return rows as IColor[];
    }
  }

  public create = async (data: {name: string, value: string}) => {
    const [results] = await this.query("INSERT INTO `colors` SET ?", data);

    const { insertId } = results as OkPacket;
    const color = await this.get(insertId);
    if (color === null) {
      throw new Error("Cannot create app");
    } else {
      return color;
    }
  }

};
