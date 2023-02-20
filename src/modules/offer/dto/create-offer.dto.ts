import { OfferType } from '../../../types/offer-type.enum.js';
import { City } from '../../../types/city.type.js';
import { Location } from '../../../types/location.type.js';
import { IsArray, IsBoolean, IsEnum, IsInt, Max, MaxLength, Min, MinLength, IsObject } from 'class-validator';

export default class CreateOfferDto {
  @MinLength(10, {message: 'Minimum title length must be 10'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})
  public title!: string;

  @MinLength(20, {message: 'Minimum description length must be 20'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024'})
  public description!: string;

  @IsObject({message: 'City should be represented as object'})
  public city!: City;

  @IsBoolean({message: 'Field premium must be boolean'})
  public premium!: boolean;

  @Min(1, {message: 'Minimum rating is 1'})
  @Max(5, {message: 'Maximum rating is 5'})
  public rating!: number;

  @IsEnum(OfferType, {message: 'type must be only Apartment, House, Room or Hotel'})
  public type!: OfferType;

  @IsInt({message: 'Rooms number must be an integer'})
  @Min(1, {message: 'Minimum rating is 1'})
  @Max(8, {message: 'Maximum price is 8'})
  public rooms!: number;

  @IsInt({message: 'Rooms number must be an integer'})
  @Min(1, {message: 'Minimum rating is 1'})
  @Max(10, {message: 'Maximum price is 10'})
  public guests!: number;

  @IsInt({message: 'Price must be an integer'})
  @Min(100, {message: 'Minimum price is 100'})
  @Max(100000, {message: 'Maximum price is 100000'})
  public price!: number;

  @IsArray({message: 'Field сonveniences must be an array'})
  public conveniences!: string[];

  public userId!: string;

  @IsObject({message: 'Location should be represented as object'})
  public location!: Location;
}
