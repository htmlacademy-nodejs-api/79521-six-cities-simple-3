import { Offer } from '../types/offer.type.js';
import crypto from 'crypto';
import { OfferType } from '../types/offer-type.enum.js';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import * as jose from 'jose';
import { ValidationError } from 'class-validator';
import { ValidationErrorField } from '../types/validation-error-field.type.js';
import { ServiceError } from '../types/service-error.enum.js';
import { UnknownObject } from '../types/unknown-object.type.js';
import { DEFAULT_STATIC_IMAGES } from '../app/application.constant.js';

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

export const getFullServerPath = (host: string, port: number) => `http://${host}:${port}`;

const isObject = (value: unknown) => typeof value === 'object' && value !== null;

export const transformProperty = (
  property: string,
  someObject: UnknownObject,
  transformFn: (object: UnknownObject) => void
) => {
  Object.keys(someObject)
    .forEach((key) => {
      if (key === property) {
        transformFn(someObject);
      } else if (isObject(someObject[key])) {
        transformProperty(property, someObject[key] as UnknownObject, transformFn);
      }
    });
};

export const transformObject = (properties: string[], staticPath: string, uploadPath: string, data: UnknownObject) => {
  properties
    .forEach((property) => transformProperty(property, data, (target: UnknownObject) => {
      const rootPath = DEFAULT_STATIC_IMAGES.includes(target[property] as string) ? staticPath : uploadPath;
      target[property] = `${rootPath}/${target[property]}`;
    }));
};
