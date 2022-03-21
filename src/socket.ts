import { Server } from 'socket.io';
import UserService from './services/users.service';
import RoomService from './services/rooms.service';
import { receptionWeb3 } from './contracts/contract';
import { parseEther } from 'ethers/lib/utils';


const userService = new UserService();
const roomService = new RoomService();
export const startSocket = (io: Server) => {
  io.on("connection", socket => {
    socket.on("user-connect", async (user) => {
      try{
        const userInfo = await userService.onlineUser(user, true);
        socket.data.user = userInfo.wallet;
        socket.broadcast.emit('user-online', userInfo);
        socket.join(user);
      } catch (err) {
        throw err
      }
    });
    socket.on('game-request', async(user) => {
      try {
        const player1 = await userService.findUserByWallet(socket.data.user);
        if(!!user)
          socket.to(user).emit('game-challenge', player1);
      } catch (err) {
        throw err;
      }      
    });
    socket.on('accept-request', async (user) => {
      try {
        if(!!user && !! socket.data.user) {
          const newRoom = {
            player1: socket.data.user,
            player2: user.wallet,
            amount: 100  // change later
          }
          const createdRoom = await roomService.createRoom(newRoom);
          const player1 = await userService.findUserByWallet(createdRoom.player1);
          const player2 = await userService.findUserByWallet(createdRoom.player2);
          // reserve room
          await receptionWeb3.createRoom(
            createdRoom.player1,
            createdRoom.player2,
            parseEther(String(createdRoom.amount)) 
          );
          receptionWeb3.once("RoomCreated", id => {
            socket.emit('room-created', {
              id: Number(id),
              player1: player1,
              player2: player2,
              amount: createdRoom.amount
            });
            socket.to(user.wallet).emit('room-created', {
              id: Number(id),
              player1: player1,
              player2: player2,
              amount: createdRoom.amount
            });
          });
          
        }
      } catch (err) {
        throw err;
      }
    });
    socket.on('reject-request', async (user) => {
      try {
        socket.to(user).emit('rejected');
      } catch (err) {
        throw err;
      }
    });
    socket.on('game-finish', async(winner) => {
      const user = await userService.findUserByUsername(winner.username);
      await receptionWeb3.decideWinner(winner.room, user.wallet);      
    });
    socket.on('disconnect', async() => {
      try {
        socket.broadcast.emit('logout', socket.data.user)
        await userService.onlineUser(socket.data.user, false);
        // await roomService.deleteByWallet(socket.data.user);

      } catch (err) {
        throw err;
      }
    });
  });
}