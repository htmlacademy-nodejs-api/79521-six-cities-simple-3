import { User } from '../../types/user.type.js';
import typegoose, { getModelForClass, defaultClasses } from '@typegoose/typegoose';
import { createSHA256 } from '../../utils/common.js';

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

  @prop({ minlength: 1, maxLength: 15, default: '', required: true })
  public username!: string;

  @prop({ unique: true, required: true })
  public email!: string;

  // ВОПРОС: Нужен ли тут у Аватара восклицательный знак?
  // Это же говорит, что поле не может быть null | undefined
  // А у нас в типе указано, что поле - необязательное, значит может быть undefined
  @prop({default: ''})
  public avatar!: string;

  @prop({ required: true, default: false })
  public isPro!: boolean;

  // ВОПРОС: в Типе USER не указано наличие поля password, почему там его нет?
  // И почему нет ошибки? Потому что при имплементации нет указания делать именно такие поля, как в типе?
  @prop({required: true, default: ''})
  public password!: string;

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
