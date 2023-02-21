import { IsEmail, IsString, Length, IsBoolean, IsOptional } from 'class-validator';
import { VALIDATIONS } from '../user.constant.js';

export default class CreateUserDto {
  @IsEmail({}, {message: 'Email must be valid address'})
  public email!: string ;

  @IsString({message: 'Username is required'})
  @Length(VALIDATIONS.username.minLength, VALIDATIONS.username.maxLength, {message: `Min length is ${VALIDATIONS.username.minLength}, max is ${VALIDATIONS.username.maxLength}`})
  public username!: string;

  @IsOptional()
  @IsString({message: 'Avatar path is required'})
  public avatar?: string;

  @IsBoolean({message: 'Premium flag should be boolean'})
  public isPro!: boolean;

  @IsString({message: 'password is required'})
  @Length(VALIDATIONS.password.minLength, VALIDATIONS.password.maxLength, {message: `Min length for password is ${VALIDATIONS.password.minLength}, max is ${VALIDATIONS.password.maxLength}`})
  public password!: string;
}
