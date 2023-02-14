export default class CreateUserDto {
  public email!: string ;
  public username!: string;
  public avatar?: string;
  public isPro!: boolean;
  public password!: string;
}
