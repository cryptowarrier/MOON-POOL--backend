import { hash } from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';

class UserService {
  public users = userModel;

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.users.find();
    return users;
  }

  public async findUserByWallet(wallet: string): Promise<User> {
    const user: User = await this.users.findOne({wallet: wallet});
    return user;
  }

  public async findUserByUsername(username: string): Promise<User> {
    const user: User = await this.users.findOne({username: username});
    return user;
  }

  public async findOnlineUsers(): Promise<User[]> {
    const users: User[] = await this.users.find({online: true});
    return users;
  }

  public async onlineUser(wallet: string, status: boolean): Promise<User> {
    const onlineUser: User = await this.users.findOneAndUpdate({wallet: wallet}, {online: status}, {returnOriginal: false});
    return onlineUser;
  }


  public async updateAvatar(avatar: string, wallet: string): Promise<User> {
    if (isEmpty(avatar)) throw new HttpException(400, "You're not avatar");

    const updatedUser: User = await this.users.findOneAndUpdate({wallet: wallet}, {avatar: avatar}, {returnOriginal: false});
    if (!updatedUser) throw new HttpException(409, "You're not user");

    return updatedUser;
  }

  public async updateUsername(username: string, wallet: string): Promise<User> {
    if (isEmpty(username)) throw new HttpException(400, "You're not username");

    const updatedUser: User = await this.users.findOneAndUpdate({wallet: wallet}, {username: username}, {returnOriginal: false});
    if (!updatedUser) throw new HttpException(409, "You're not user");

    return updatedUser;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "You're not user");

    return deleteUserById;
  }
}

export default UserService;
