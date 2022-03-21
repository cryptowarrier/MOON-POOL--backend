import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import userService from '@services/users.service';

class UsersController {
  public userService = new userService();

  public updateAvatar = async (req: any, res: Response, next: NextFunction) => {
    try {
      const wallet = req.body.wallet;
      const avatar = req.file.filename;
      const updatedUser: User = await this.userService.updateAvatar(avatar, wallet);

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  };

  public updateUsername = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const wallet = req.params.wallet;
      const username = req.body.username;
      const updatedUser: User = await this.userService.updateUsername(username, wallet);

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  public findOnlineUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const onlineUsers: User[] = await this.userService.findOnlineUsers();
      res.status(200).json(onlineUsers);
    } catch (err) {
      next(err);
    }
  }

  
}

export default UsersController;
