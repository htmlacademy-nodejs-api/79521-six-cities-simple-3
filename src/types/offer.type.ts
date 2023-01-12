import { User } from './user.type.js';
import { OfferType } from './offer-type.enum.js';
import { Location } from './location.type.js';
import { Cities } from './city.type.js';

export type Offer = {
  title: string,
  description: string,
  createdAt: Date,
  // Как тут определить тип для 1 из 6 значений для городов?
  city: Cities,
  thumbnail: string,
  pictures: string[],
  premium: boolean,
  rating: number,
  // Аналогично, нужно выбрать 1 из 4 значений типа объявления
  type: OfferType,
  rooms: number,
  guests: number,
  price: number,
  conveniences: string[],
  author: User,
  commentsNum: number,
  location: Location,
}
