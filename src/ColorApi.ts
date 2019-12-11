import { Request, Response, Router } from "express";
import { ColorController } from "./ColorController";
const colors = Router();

colors.get("/colors", async (_: Request, response: Response) => {
  try {
    const colors = await new ColorController().getColors();
    return response.status(200).send(colors);
  } catch (error){
    console.error(error);
    return response.status(503).send((error as Error).message);
  }
});

colors.post("/colors", async (request: Request, response: Response) => {
  const newColor = request.body.color as string;
  if (!/#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/.test(newColor)) {
    return response.status(400).send("New color must be a hex code");
  }

  try {
    const colors = await new ColorController().addColor(newColor);
    return response.status(200).send(colors);
  } catch (error) {
    console.error(error);
    return response.status(503).send((error as Error).message);
  }
});

export { colors };