import { Expose } from 'class-transformer';

export default class UploadPicturesResponse {
  @Expose()
  public pictures!: string[];
}
