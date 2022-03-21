import { IsBoolean, IsString, IsNumber, IsArray } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public username: string;
  @IsString()
  public wallet: string;
  @IsNumber()
  public rank: number;
  @IsString()
  public bio: string;
  @IsArray()
  public achievements: string[];
  @IsString()
  public avatar: string;
  @IsBoolean()
  public online: boolean;
}
