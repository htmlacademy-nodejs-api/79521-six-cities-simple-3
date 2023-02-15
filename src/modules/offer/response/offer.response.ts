import { Expose } from 'class-transformer';
import { OfferType } from '../../../types/offer-type.enum';
import { City } from '../../../types/city.type';

export default class OfferResponseBrief {
  @Expose()
  public title!: string;

  @Expose()
  public price!: number;

  @Expose()
  public type!: OfferType;

  @Expose()
  public createdAt!: string;

  @Expose()
  public city!: City;

  @Expose()
  public thumbnail!: string;

  @Expose()
  public premium!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public commentsCount!: number;
}
