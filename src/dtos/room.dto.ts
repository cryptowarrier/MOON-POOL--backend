import { IsNumber, IsString } from "class-validator";


export class CreateRoomDto {
  @IsString()
  public player1: string;
  @IsString()
  public player2: string;
  @IsNumber()
  public amount: number;
}