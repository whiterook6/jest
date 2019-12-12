import { Server } from "http";
import request from "supertest";
import { IColor } from "../src/Color";
import { ColorController } from "../src/ColorController";
import { buildServer } from "../src/Server";
import { ColorFaker } from "./ColorFaker";


let server: Server;

// mock controller functions
jest.mock("../src/ColorController");

describe("AppAPI", () => {
  beforeAll((done) => {
    server = buildServer().listen(done);
  });

  it("should return a list of colors", async (done) => {
    const colors = new ColorFaker().makeMany(3); // make() doesn't add to a database. see create().
    ColorController.prototype.list = async (): Promise<IColor[]> => {
      return colors;
    };

    const response = await request(server)
      .get("/api/colors")
      .send();

    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(colors.length);
    expect(response.body).toEqual(colors);
    done();
  });

  it("can add a color", async (done) => {
    const color = new ColorFaker().make();
    ColorController.prototype.getBy = async () => [];

    const createFN = jest.fn(async () => color);
    ColorController.prototype.create = createFN
    const response = await request(server)
      .post("/api/colors")
      .send({color});

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(color);
    expect(createFN.mock.calls).toHaveLength(1);

    // array(color), because create.mock.calls[0] is an array of arguments,
    // even if there's only one argument.
    expect(createFN.mock.calls[0]).toEqual([color]);

    done();
  });

  it("will complain if the new color isn't a hex code", async (done) => {
    console.log("Implement me");
    done();
  });

  afterAll((done) => {
    jest.clearAllMocks();
    server.close(done);
  });
});
