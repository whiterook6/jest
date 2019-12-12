import bodyParser from "body-parser";
import express from "express";
import { router } from "./ColorApi";

export const buildServer = () => {
  const app = express();
  app.use(express.json());
  app.use(bodyParser.json());
  app.use("/api", router);

  return app;
};