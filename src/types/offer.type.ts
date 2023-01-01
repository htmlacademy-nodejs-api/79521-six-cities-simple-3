import { User } from './user.type.js';
import { OfferType } from './offer-type.enum.js';
import { Location } from './location.type.js';

export type Offer = {
  title: string,
  description: string,
  createdAt: Date,
  city: string,
  previewImg: string,
  pictures: string[],
  premium: boolean,
  rating: number,
  type: OfferType,
  rooms: number,
  guests: number,
  price: number,
  conveniences: string[],
  author: User,
  commentsNum: number,
  location: Location,
}
