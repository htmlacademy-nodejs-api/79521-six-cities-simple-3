import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';
import { OfferType } from '../../types/offer-type.enum.js';
import { UserEntity } from '../user/user.entity.js';
import { Cities } from '../../types/city.type.js';
import { Location } from '../../types/location.type.js';

const { prop, modelOptions } = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})

export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ minlength: 10, maxLength: 100, trim: true, required: true })
  public title!: string;

  @prop({ minlength: 20, maxLength: 1024, trim: true, required: true })
  public description!: string;

  @prop({
    type: () => String,
  })
  public city!: Cities;

  @prop()
  public thumbnail!: string;

  @prop({
    type: () => Array,
  })
  public pictures!: string[];

  @prop({ required: true })
  public premium!: boolean;

  @prop({ required: true, min: 1, max: 5 })
  public rating!: number;

  @prop({
    type: () => String,
    enum: OfferType,
  })
  public type!: string;

  @prop({ required: true, min: 1, max: 8 })
  public rooms!: number;

  @prop({ required: true, min: 1, max: 10 })
  public guests!: number;

  @prop({ required: true, min: 100, max: 100000 })
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
