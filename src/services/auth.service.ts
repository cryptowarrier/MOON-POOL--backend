import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import { v4 as uuid } from 'uuid';

class AuthService {
  public users = userModel;

  public async login(wallet: string): Promise<User> {
    if (isEmpty(wallet)) throw new HttpException(400, "You're not wallet");

    const findUser: User = await this.users.findOne({ wallet: wallet });
    if (!!findUser) {
      return findUser;
    }
    const prefix: string = process.env.PLAYER_PREFIX;
    const id: string = uuid();
    const user: CreateUserDto = {
      username: prefix + id,
      bio: '',
      wallet: wallet,
      rank: 0,
      achievements: [],
      avatar: 'defaultAvatar.png',
      online: true
    }
    const newUser: User = await this.users.create(user);
    return newUser;
  }
}

export default AuthService;