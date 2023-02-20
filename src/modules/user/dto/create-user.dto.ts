import { IsEmail, IsString, Length, IsBoolean, IsOptional } from 'class-validator';

export default class CreateUserDto {
  @IsEmail({}, {message: 'Email must be valid address'})
  public email!: string ;

  @IsString({message: 'Username is required'})
  @Length(1, 15, {message: 'Min length is 1, max is 15'})
  public username!: string;

  @IsOptional()
  @IsString({message: 'Avatar path is required'})
  public avatar?: string;

  @IsBoolean({message: 'Premium flag should be boolean'})
  public isPro!: boolean;

  @IsString({message: 'password is required'})
  @Length(6, 12, {message: 'Min length for password is 6, max is 12'})
  public password!: string;
}
