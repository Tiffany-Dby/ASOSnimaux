import cors from "cors";
import express from "express";
import helmet from "helmet";

const initMiddlewares = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({ origin: "*" }));
  app.use(helmet());
  app.use(express.static('public'));
}

export default initMiddlewares;