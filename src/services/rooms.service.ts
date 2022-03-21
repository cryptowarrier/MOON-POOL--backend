import { CreateRoomDto } from "@/dtos/room.dto";
import { HttpException } from "@/exceptions/HttpException";
import { Room } from "@/interfaces/room.interface";
import roomModel from "@/models/rooms.model";
import { isEmpty } from "class-validator";

class RoomService {
  public rooms = roomModel;
  public async createRoom(roomData: CreateRoomDto): Promise<any> {
    if(isEmpty(roomData)) throw new HttpException(400, 'You are not room');

    const createRoomData: Room = await this.rooms.create(roomData);

    return createRoomData;
  }

  public async deleteRoom(roomId: string): Promise<Room> {
    const deleteRoomById: Room = await this.rooms.findByIdAndDelete(roomId);
    if(!deleteRoomById) throw new HttpException(409, "You're not room");

    return deleteRoomById;
  }
  public async deleteByWallet(wallet: string) {
    await this.rooms.deleteMany({player1: wallet});
    await this.rooms.deleteMany({player2: wallet});
  }
  public async findRoomsByWallet(wallet: string): Promise<any> {
    const pipeline = [
      {
        '$match': {
          '$or': [
            {
              'player1': wallet
            }, {
              'player2': wallet
            }
          ]
        }
      }, {
        '$lookup': {
          'from': 'users', 
          'localField': 'player1', 
          'foreignField': 'wallet', 
          'as': 'player1'
        }
      }, {
        '$lookup': {
          'from': 'users', 
          'localField': 'player2', 
          'foreignField': 'wallet', 
          'as': 'player2'
        }
      }, {
        '$project': {
          '_id': '$_id', 
          'player1': {
            '$arrayElemAt': [
              '$player1', 0
            ]
          }, 
          'player2': {
            '$arrayElemAt': [
              '$player2', 0
            ]
          }
        }
      }
    ];
    const rooms = await this.rooms.aggregate(pipeline);
    return rooms;
  }
}

export default RoomService;