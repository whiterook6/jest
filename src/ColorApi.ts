import { Request, Response, Router } from "express";
import { ColorController } from "./ColorController";
const router = Router();

router.get("/colors", async (_: Request, response: Response) => {
  try {
    const colors = await new ColorController().list();
    return response.status(200).send(colors);
  } catch (error){
    console.error(error);
    return response.status(503).send((error as Error).message);
  }
});

router.post("/colors", async (request: Request, response: Response) => {
  const newColor = request.body.color as {
    name: string,
    value: string
  };
  if (!/#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/.test(newColor.value)) {
    return response.status(400).send("New color must be a hex code");
  }

  const controller = new ColorController();
  const existingColors = await controller.getBy("name", newColor.name);
  if (existingColors.length > 0){
    return response.status(401).send({
      error: "A color with that name already exists"
    });
  }

  try {
    const createdColor = await controller.create(newColor);
    return response.status(200).send(createdColor);
  } catch (error) {
    console.error(error);
    return response.status(503).send((error as Error).message);
  }
});

export { router };