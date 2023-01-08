import { OfferType } from '../../types/offer-type.enum.js';
import { Offer } from '../../types/offer.type.js';
import { Location } from '../../types/location.type.js';
import { User } from '../../types/user.type.js';

export const createOffer = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [
    title, description, createdAt, city,
    thumbnail, pictures, premium, rating, type,
    rooms, guests, price, conveniences, username,
    email, isPro, avatar, commentsCounter, location
  ] = tokens;
  return {
    title,
    description,
    createdAt: new Date(createdAt),
    city,
    thumbnail,
    pictures: pictures.split(';'),
    premium: Boolean(premium),
    rating: Number(rating),
    type: OfferType[type as 'apartment' | 'house' | 'room' | 'hotel'],
    rooms: Number(rooms),
    guests: Number(guests),
    price: Number(price),
    conveniences: conveniences.split(','),
    author: { username, email, isPro: Boolean(isPro), avatar } as User,
    commentsNum: Number(commentsCounter),
    location: location as Location,
  } as Offer;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';
