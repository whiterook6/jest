import { ColorFaker } from "./ColorFaker";
import { ColorController} from "../src/ColorController";
import { Database } from "../src/Database";
import { Connection } from "mysql2/promise";

describe("Color Controller Test", () => {
  let connection: Connection;
  beforeAll(async (done) => {
    connection = await Database.getConnection();
    done();
  });

  it("can get a list of colors", async (done) => {
    const connection = await Database.getConnection();
    await connection.beginTransaction();

    try {
      // setup
      const expectedColors = await new ColorFaker(connection).createMany(4);

      // test
      const actualColors = await new ColorController(connection).list();

      // verify
      expect(actualColors).toEqual(expectedColors);
    } finally {
      await connection.rollback();
      connection.destroy();
      done();
    }
  });

  it("can create a color", async (done) => {
    const connection = await Database.getConnection();
    await connection.beginTransaction();

    try {
      // setup
      const fakedColor = new ColorFaker().make();
      // test

      const actualColor = await new ColorController(connection).create({
        name: fakedColor.name,
        value: fakedColor.value
      });

      // verify
      expect(actualColor.name).toEqual(fakedColor.name);
      expect(actualColor.value).toEqual(fakedColor.value);
      expect(actualColor.id).toBeGreaterThan(0);
    } finally {
      await connection.rollback();
      connection.destroy();
      done();
    }
  });

  afterAll(async (done) => {
    await Database.closePool();
    done();
  });
});
