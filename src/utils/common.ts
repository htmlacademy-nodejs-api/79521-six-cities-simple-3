import { Offer } from '../types/offer.type.js';
import crypto from 'crypto';
import { OfferType } from '../types/offer-type.enum.js';
import { plainToInstance } from 'class-transformer';
import { ClassConstructor } from 'class-transformer/types/interfaces/class-constructor.type.js';

export const createOffer = (row: string): Offer => {
  const tokens = row.replace('\n', '').split('\t');
  const [
    title, description, createdAt, city,
    thumbnail, pictures, premium, rating, type,
    rooms, guests, price, conveniences, latitude, longitude, username,
    email, isPro, avatar, password
  ] = tokens;

  return {
    title,
    description,
    createdAt: new Date(createdAt),
    city: JSON.parse(city),
    thumbnail,
    pictures: pictures.split(';'),
    premium: Boolean(premium),
    rating: Number(rating),
    type: type as OfferType,
    rooms: Number(rooms),
    guests: Number(guests),
    price: Number(price),
    conveniences: conveniences.split(','),
    author: { username, email, isPro: Boolean(isPro), avatar, password },
    location: { latitude: Number(latitude), longitude: Number(longitude) },
  };
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});

export const createErrorObject = (message: string) => ({
  error: message,
});
