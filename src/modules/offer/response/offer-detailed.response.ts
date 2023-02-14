import { Expose, Type } from 'class-transformer';
import { OfferType } from '../../../types/offer-type.enum';
import { City } from '../../../types/city.type';
import UserResponse from '../../user/response/user.response';
import { Location } from '../../../types/location.type';

export default class OfferResponseDetailed {
  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public price!: number;

  @Expose()
  public type!: OfferType;

  @Expose()
  public createdAt!: Date;

  @Expose()
  public city!: City;

  @Expose()
  public thumbnail!: string;

  @Expose()
  public pictures!: string[];

  @Expose()
  public premium!: boolean;

  @Expose()
  public rooms!: number;

  @Expose()
  public guests!: number;

  @Expose()
  public rating!: number;

  @Expose()
  public conveniences!: string[];

  @Expose()
  public commentsCount!: number;

  @Expose({ name: 'userId'})
  @Type(() => UserResponse)
  public user!: UserResponse;

  @Expose()
  public location!: Location;
}
