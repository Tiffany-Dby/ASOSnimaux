import express from "express";
import { UserController } from "../controllers/user.controllers.js";
import jwtMddlwr from "../middlewares/jwt.mddlwrs.js";
import isAdminOrOwner from "../middlewares/isAdminOrOwner.mddlwrs.js";


const initUserRoutes = (app) => {
  const userRouter = express.Router();

  // GET
  userRouter.get("/user", jwtMddlwr, UserController.readOne);
  userRouter.get("/testimonies", jwtMddlwr, UserController.readUsersTestimonies);
  userRouter.get("/follow", jwtMddlwr, UserController.readUsersFollow)

  // POST
  userRouter.post("/", UserController.create);
  userRouter.post("/sign-in", UserController.signIn);
  userRouter.post("/follow", jwtMddlwr, UserController.followAnimal);

  // PUT
  userRouter.put("/username", jwtMddlwr, UserController.updateUsername);
  userRouter.put("/password", jwtMddlwr, UserController.updatePassword);

  // DELETE
  userRouter.delete("/unfollow/:animalID", jwtMddlwr, UserController.unfollow);
  userRouter.delete("/:id", jwtMddlwr, isAdminOrOwner, UserController.deleteOne);

  // Attaching router to /users path
  app.use("/users", userRouter);
}

export default initUserRoutes;