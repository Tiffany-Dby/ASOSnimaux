import express from "express";
import { TestimonyController } from "../controllers/testimony.controllers.js";
import jwtMddlwr from "../middlewares/jwt.mddlwrs.js";
import isAdminOrOwner from "../middlewares/isAdminOrOwner.mddlwrs.js";

const initTestimonyRoutes = (app) => {
  const testimonyRouter = express.Router();

  // GET
  testimonyRouter.get("/", TestimonyController.readAllWithTheirUsername);
  testimonyRouter.get("/overview", TestimonyController.readWithTheirUsername);

  // POST
  testimonyRouter.post("/", jwtMddlwr, TestimonyController.create);

  // PUT
  testimonyRouter.put("/", jwtMddlwr, TestimonyController.update);

  // DELETE
  testimonyRouter.delete("/:testimonyID", jwtMddlwr, isAdminOrOwner, TestimonyController.deleteOne);

  // Attaching router to /testimonies path
  app.use("/testimonies", testimonyRouter);
}

export default initTestimonyRoutes;