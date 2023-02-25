import { Offer } from '../types/offer.type.js';
import crypto from 'crypto';
import { OfferType } from '../types/offer-type.enum.js';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import * as jose from 'jose';
import { ValidationError } from 'class-validator';
import { ValidationErrorField } from '../types/validation-error-field.type.js';
import { ServiceError } from '../types/service-error.enum.js';

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

export const createErrorObject = (serviceError: ServiceError, message: string, details: ValidationErrorField[] = []) => ({
  errorType: serviceError,
  message,
  details: [...details]
});

export const createJWT = async (algoritm: string, jwtSecret: string, payload: object): Promise<string> =>
  new jose.SignJWT({...payload})
    .setProtectedHeader({ alg: algoritm})
    .setIssuedAt()
    .setExpirationTime('2d')
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));

export const transformErrors = (errors: ValidationError[]): ValidationErrorField[] =>
  errors.map(({property, value, constraints}) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));
