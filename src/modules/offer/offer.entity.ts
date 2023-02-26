import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';
import { OfferType } from '../../types/offer-type.enum.js';
import { UserEntity } from '../user/user.entity.js';
import { Location } from '../../types/location.type.js';
import { City } from '../../types/city.type.js';
import { VALIDATIONS } from './offer.constant.js';

const { prop, modelOptions } = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})

export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ minlength: VALIDATIONS.title.minLength, maxLength: VALIDATIONS.title.maxLength, trim: true, required: true })
  public title!: string;

  @prop({ minlength: VALIDATIONS.description.minLength, maxLength: VALIDATIONS.description.maxLength, trim: true, required: true })
  public description!: string;

  @prop({
    type: () => Object,
  })
  public city!: City;

  @prop({default: ''})
  public thumbnail!: string;

  @prop({
    type: () => Array,
    default: [],
  })
  public pictures!: string[];

  @prop({ required: true })
  public premium!: boolean;

  @prop({ required: true, min: VALIDATIONS.rating.min, max: VALIDATIONS.rating.max })
  public rating!: number;

  @prop({
    required: true,
    type: () => String,
    enum: OfferType,
  })
  public type!: string;

  @prop({ required: true, min: VALIDATIONS.rooms.min, max: VALIDATIONS.rooms.max })
  public rooms!: number;

  @prop({ required: true, min: VALIDATIONS.guests.min, max: VALIDATIONS.guests.max })
  public guests!: number;

  @prop({ required: true, min: VALIDATIONS.price.min, max: VALIDATIONS.price.max })
  public price!: number;

  @prop({
    type: () => Array,
  })
  public conveniences!: string[];

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;

  @prop({ default: 0 })
  public commentsNum!: number;

  @prop({
    type: () => Object,
  })
  public location!: Location;
}

export const OfferModel = getModelForClass(OfferEntity);
