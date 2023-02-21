import typegoose, {getModelForClass, Ref, defaultClasses} from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';
import { OfferEntity } from '../offer/offer.entity.js';
import { VALIDATIONS } from './comment.constant.js';

const { prop, modelOptions } = typegoose;

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({trim: true, required: true, minlength: VALIDATIONS.text.minLength, maxlength: VALIDATIONS.text.maxLength})
  public text!: string;

  @prop({required: true, min: VALIDATIONS.rating.min, max: VALIDATIONS.rating.max })
  public rating!: number;

  @prop({
    ref: OfferEntity,
    required: true
  })
  public offerId!: Ref<OfferEntity>;

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
