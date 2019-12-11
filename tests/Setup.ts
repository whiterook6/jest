import {ColorController} from "../src/ColorController";

module.exports = async () => {
  console.log("Setup...");
  const controller = new ColorController();
  await controller.migrate();
  console.log("...done.");
};
