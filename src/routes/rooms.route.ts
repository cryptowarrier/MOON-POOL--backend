import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import RoomsController from '@/controllers/rooms.controller';

class RoomsRoute implements Routes {
  public path = '/rooms';
  public router = Router();
  public roomsController = new RoomsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:wallet`, this.roomsController.findRoomsByWallet);
  }
}

export default RoomsRoute;