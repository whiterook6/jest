import faker from "faker";
import { Connection, OkPacket } from "mysql2/promise";
import { IColor } from "../src/Color";
import { Controller } from "../src/Controller";

export class ColorFaker extends Controller {
  public constructor(connection?: Connection) {
    super(connection);
  }

  public async create(
    data: Partial<IColor> = {}
  ): Promise<IColor> {
    const fakerData: Partial<IColor> = {};
    Object.assign(
      fakerData,
      {
        name: faker.lorem.words(3),
        value: faker.internet.color(),
      },
      data
    );

    const [result] = await this.query("INSERT INTO `colors` SET ?", fakerData);
    const {insertId} = result as OkPacket;
    const [rows] = await this.query(
      "SELECT `colors`.* FROM `colors` WHERE `id` = ? LIMIT 1",
      insertId
    );

    if (!Array.isArray(rows) || rows.length !== 1) {
      throw new Error("Cannot fake Color");
    } else {
      return rows[0] as IColor;
    }
  }

  public async createMany(
    howMany: number,
    data: Partial<IColor> = {}
  ): Promise<IColor[]> {
    const rowIDs = await Promise.all(
      [...new Array(howMany)].map(async () => {
        const fakerData: Partial<IColor> = {};
        Object.assign(
          fakerData,
          {
            name: faker.lorem.words(3),
            value: faker.internet.color(),
          },
          data
        );

        const results = await this.query("INSERT INTO `colors` SET ?", fakerData);
        const {insertId} = results[0] as OkPacket;
        return insertId;
      })
    );

    const [
      rows,
    ] = await this.query(
      "SELECT `colors`.* FROM `colors` WHERE `colors`.`id` IN (?)",
      [rowIDs]
    );

    if (!Array.isArray(rows)) {
      throw new Error("Cannot fake Color");
    } else {
      return rows as IColor[];
    }
  }

  public make(data: Partial<IColor> = {}): IColor {
    const fakerData: Partial<IColor> = {};
    Object.assign(
      fakerData,
      {
        id: faker.random.number({ min: 1, max: 100 }),
        name: faker.lorem.words(3),
        value: faker.internet.color(),
      },
      data
    );

    return fakerData as IColor;
  }

  public makeMany = (howMany: number, data: Partial<IColor> = {}): IColor[] => {
    return [...new Array(howMany)].map((_) => this.make(data));
  };
}
