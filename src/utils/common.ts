import { Offer } from '../types/offer.type.js';
import crypto from 'crypto';

export const createOffer = (row: string): Offer => {
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
    type,
    rooms: Number(rooms),
    guests: Number(guests),
    price: Number(price),
    conveniences: conveniences.split(','),
    author: { username, email, isPro: Boolean(isPro), avatar },
    commentsNum: Number(commentsCounter),
    location,
  };
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';


export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};
