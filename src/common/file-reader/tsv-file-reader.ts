import { readFileSync } from 'fs';
import { OfferType } from '../../types/offer-type.enum.js';
import { Offer } from '../../types/offer.type.js';
import { Location } from '../../types/location.type.js';
import { FileReaderInterface } from './file-reader.interface.js';
import { User } from '../../types/user.type.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([
        title,
        description,
        createdAt,
        city,
        previewImg,
        pictures,
        premium,
        rating,
        type,
        rooms,
        guests,
        price,
        conveniences,
        username,
        email,
        password,
        isPro,
        commentsNum,
        location
      ]) => ({
        title,
        description,
        createdAt: new Date(createdAt),
        city,
        previewImg,
        pictures: pictures.split(';'),
        premium: Boolean(premium),
        rating: Number(rating),
        type: OfferType[type as 'Apartament' | 'House' | 'Room' | 'Hotel'],
        rooms: Number(rooms),
        guests: Number(guests),
        price: Number(price),
        conveniences: conveniences.split(','),
        author: {username, email, password, isPro: Boolean(isPro)} as User,
        commentsNum: Number(commentsNum),
        location: {
          latitude: Number(location.split(',')[0]),
          longitude: Number(location.split(',')[1]),
        } as Location,
      }));
  }
}
