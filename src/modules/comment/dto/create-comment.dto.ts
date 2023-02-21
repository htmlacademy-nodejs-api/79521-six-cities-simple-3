import { IsMongoId, IsString, Length, Min, Max } from 'class-validator';
import { VALIDATIONS } from '../comment.constant.js';

export default class CreateCommentDto {
  @IsString({message: 'text is required'})
  @Length(VALIDATIONS.text.minLength, VALIDATIONS.text.maxLength, {message: `Min length is ${VALIDATIONS.text.minLength}, max is ${VALIDATIONS.text.maxLength}`})
  public text!: string;

  @IsMongoId({message: 'offerId field must be a valid id'})
  public offerId!: string;

  public userId!: string;

  @Min(VALIDATIONS.rating.min, { message: `Minimum rating must be ${VALIDATIONS.rating.min}` })
  @Max(VALIDATIONS.rating.max, { message: `Maximum rating must be ${VALIDATIONS.rating.max}` })
  public rating!: number;
}
