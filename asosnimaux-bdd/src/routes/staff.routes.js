import express from "express";
import { StaffController } from "../controllers/staff.controllers.js";
import jwtMddlwr from "../middlewares/jwt.mddlwrs.js";
import isAdmin from "../middlewares/isAdmin.mddlwrs.js";

const initStaffRoutes = (app) => {
  const staffRouter = express.Router();

  // GET
  staffRouter.get("/all", StaffController.readAll);
  staffRouter.get("/status/:status", StaffController.readByStatus);
  staffRouter.get("/role/:staffRole", StaffController.readByStaffRole);

  // POST
  staffRouter.post("/", jwtMddlwr, isAdmin, StaffController.create);

  // PUT
  staffRouter.put("/", jwtMddlwr, isAdmin, StaffController.update);

  // DELETE
  staffRouter.delete("/:staffID", jwtMddlwr, isAdmin, StaffController.deleteOne);

  // GET
  staffRouter.get("/:staffID", StaffController.readOne);

  // Attaching router to /staff path
  app.use("/staff", staffRouter);
}

export default initStaffRoutes;