import { Router } from "express";
import { BaseHttpController } from "../controllers/basehttp.controller";
import { ObjectLiteral } from "typeorm";

export abstract class BaseHttpRouter<T extends ObjectLiteral> {
  public router: Router;

  protected constructor(
    protected controller: BaseHttpController<T>,
  ) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get("/getAll", (req, res) => this.controller.getAll(req, res));
    this.router.get("/getById/:id", (req, res) => this.controller.getById(req, res));
    this.router.post("/create", (req, res) => this.controller.create(req, res));
    this.router.delete("/deleteById/:id", (req, res) => this.controller.deleteById(req, res));
  }
}
