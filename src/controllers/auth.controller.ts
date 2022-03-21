import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';

class AuthController {
  public authService = new AuthService();

  public login = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const wallet: string = req.body.wallet;
      const findUser: User = await this.authService.login(wallet);
      res.status(200).json(findUser);
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;