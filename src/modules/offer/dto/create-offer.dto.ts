import { OfferType } from '../../../types/offer-type.enum.js';
import { City } from '../../../types/city.type.js';
import { Location } from '../../../types/location.type.js';
import { IsString, IsArray, IsBoolean, IsEnum, IsInt, Max, MaxLength, Min, MinLength, ArrayMinSize, ArrayMaxSize, IsObject } from 'class-validator';
import { VALIDATIONS } from '../offer.constant.js';

export default class CreateOfferDto {
  @MinLength(VALIDATIONS.title.minLength, {message: `Minimum title length must be ${VALIDATIONS.title.minLength}`})
  @MaxLength(VALIDATIONS.title.maxLength, {message: `Maximum title length must be ${VALIDATIONS.title.maxLength}`})
  public title!: string;

  @MinLength(VALIDATIONS.description.minLength, {message: `Minimum description length must be ${VALIDATIONS.description.minLength}`})
  @MaxLength(VALIDATIONS.description.maxLength, {message: `Maximum description length must be ${VALIDATIONS.description.maxLength}`})
  public description!: string;

  @IsObject({message: 'City should be represented as object'})
  public city!: City;

  @IsString({message: 'Thumbnail is required'})
  public thumbnail!: string;

  @IsArray({message: 'Field pictures must be an array'})
  @ArrayMinSize(VALIDATIONS.pictures.number, { message: `Minimum must be ${VALIDATIONS.pictures.number} picture` })
  @ArrayMaxSize(VALIDATIONS.pictures.number, { message: `Maximum must be ${VALIDATIONS.pictures.number} picture` })
  public pictures!: string[];

  @IsBoolean({message: 'Field premium must be boolean'})
  public premium!: boolean;

  @Min(VALIDATIONS.rating.min, {message: `Minimum rating is ${VALIDATIONS.rating.min}`})
  @Max(VALIDATIONS.rating.max, {message: `Maximum rating is ${VALIDATIONS.rating.max}`})
  public rating!: number;

  @IsEnum(OfferType, {message: 'type must be only Apartment, House, Room or Hotel'})
  public type!: OfferType;

  @IsInt({message: 'Rooms number must be an integer'})
  @Min(VALIDATIONS.rating.min, {message: `Minimum rating is ${VALIDATIONS.rating.min}`})
  @Max(VALIDATIONS.rating.max, {message: `Maximum price is ${VALIDATIONS.rating.max}`})
  public rooms!: number;

  @IsInt({message: 'Rooms number must be an integer'})
  @Min(VALIDATIONS.guests.min, {message: `Minimum rating is ${VALIDATIONS.guests.min}`})
  @Max(VALIDATIONS.guests.max, {message: `Maximum price is ${VALIDATIONS.guests.max}`})
  public guests!: number;

  @IsInt({message: 'Price must be an integer'})
  @Min(VALIDATIONS.price.min, {message: `Minimum price is ${VALIDATIONS.price.min}`})
  @Max(VALIDATIONS.price.max, {message: `Maximum price is ${VALIDATIONS.price.max}`})
  public price!: number;

  @IsArray({message: 'Field сonveniences must be an array'})
  public conveniences!: string[];

  public userId!: string;

  @IsObject({message: 'Location should be represented as object'})
  public location!: Location;
}
