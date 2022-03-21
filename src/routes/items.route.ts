import { Router } from 'express';
import ItemsController from '@controllers/items.controller';
import { CreateItemDto } from '@/dtos/items.dto';
import { Routes } from '@/interfaces/routes.interface';


class ItemsRoute implements Routes {
  public path = '/items';
  public router = Router();
  public itemsController = new ItemsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.itemsController.createItem);
    this.router.get(`${this.path}/user/:user`, this.itemsController.findItemsByUser);
    this.router.get(`${this.path}/category/:category`, this.itemsController.findItemsByCategory);
    this.router.get(`${this.path}`, this.itemsController.getItems);
  }
}

export default ItemsRoute;