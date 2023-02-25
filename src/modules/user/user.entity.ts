import { User } from '../../types/user.type.js';
import typegoose, { getModelForClass, defaultClasses } from '@typegoose/typegoose';
import { createSHA256 } from '../../utils/common.js';
import { VALIDATIONS } from './user.constant.js';

const { prop, modelOptions } = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})

export class UserEntity extends defaultClasses.TimeStamps implements User {
  constructor(data: User) {
    super();

    this.username = data.username;
    this.email = data.email;
    this.avatar = data.avatar;
    this.isPro = data.isPro;
  }

  @prop({ minlength: VALIDATIONS.username.minLength, maxLength: VALIDATIONS.username.maxLength, default: '', required: true })
  public username!: string;

  @prop({ unique: true, required: true })
  public email!: string;

  @prop({default: 'default-avatar.jpg'})
  public avatar?: string;

  @prop({ required: true, default: false })
  public isPro!: boolean;

  @prop({required: true, default: ''})
  public password!: string;

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
