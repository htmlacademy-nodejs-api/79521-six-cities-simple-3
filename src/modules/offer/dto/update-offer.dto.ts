import { OfferType } from '../../../types/offer-type.enum.js';
import { Cities } from '../../../types/city.type.js';
import { Location } from '../../../types/location.type.js';

export default class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public createdAt?: Date;
  public city?: Cities;
  public thumbnail?: string;
  public pictures?: string[];
  public premium?: boolean;
  public rating?: number;
  public type?: OfferType;
  public rooms?: number;
  public guests?: number;
  public price?: number;
  public conveniences?: string[];
  public location?: Location;
}
