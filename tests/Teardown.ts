import { Database } from "../src/Database";

module.exports = async () => {
  console.log("\nTeardown...");
  await Database.closePool();
  console.log("...complete.\n");
};