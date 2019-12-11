import { Server } from "http";
import { buildServer } from "../src/Server";
let server: Server;

describe("Color API Test", () => {
  beforeAll(done => {
    server = buildServer().listen(done);
  });

  it("can get a list of colors", async (done) => {
    expect(2+2).toEqual(3);
  });

  afterAll(done => {
    server.close(done);
  });
});
