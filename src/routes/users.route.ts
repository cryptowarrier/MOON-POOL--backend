import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { Routes } from '@interfaces/routes.interface';
import multer from '@/libs/multer';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/avatar`, multer.single('file'), this.usersController.updateAvatar);
    this.router.post(`${this.path}/username/:wallet`, this.usersController.updateUsername);
    this.router.get(`${this.path}/online`, this.usersController.findOnlineUsers);
  }
}

export default UsersRoute;
