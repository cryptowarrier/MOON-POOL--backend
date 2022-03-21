import { NextFunction, Request, Response } from 'express';
import { CreateRoomDto } from '@/dtos/room.dto';
import { Room } from '@/interfaces/room.interface';
import RoomService from '@/services/rooms.service';

class RoomsController {
  public roomService = new RoomService();

  public findRoomsByWallet = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const wallet = req.params.wallet;
      const rooms: Room[] = await this.roomService.findRoomsByWallet(wallet);

      res.status(200).json(rooms);
    } catch (err) {
      next(err);
    }
  }
}

export default RoomsController;