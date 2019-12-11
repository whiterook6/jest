console.log("Building Server...");
import { buildServer } from "./Server";
const app = buildServer();

console.log("HTTP Server starting...");
import { createServer as createHttp } from "http";
createHttp(app).listen(8080, () => {
  console.log("Server Started.");
});
