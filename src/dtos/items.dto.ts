import { IsString, IsObject, IsBoolean, IsNumber, IsArray, IsDate } from 'class-validator';

export class CreateItemDto {
  @IsString()
  public imageLink: String;
  @IsString()
  public name: String;
  @IsString()
  public externalLink: String;
  @IsString()
  public description: String;
  @IsArray()
  public category: String;
  @IsObject()
  public property: Object;
  @IsBoolean()
  public unlockable: Boolean;
  @IsBoolean()
  public sensitive: Boolean;
  @IsNumber()
  public numberOfCopy: Number;
  @IsNumber()
  public chain: Number;
  @IsString()
  public user: String;
  @IsDate()
  public createdAt: Date;
  @IsDate()
  public updatedAt: Date;
}