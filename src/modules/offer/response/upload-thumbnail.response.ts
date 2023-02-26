import { Expose } from 'class-transformer';

export default class UploadThumbnailResponse {
  @Expose()
  public thumbnail!: string;
}
