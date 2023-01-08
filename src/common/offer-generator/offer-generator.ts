import dayjs from 'dayjs';

import { MockData } from '../../types/mock-data.type.js';
import { City } from '../../types/mock-data-city.type.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../utils/random.js';
import { OfferGeneratorInterface } from './offer-generator.interface.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_PRICE = 100;
const MAX_PRICE = 100000;
const MIN_RATING = 1;
const MAX_RATING = 5;
const MIN_ROOMS = 1;
const MAX_ROOMS = 8;
const MIN_GUESTS = 1;
const MAX_GUESTS = 10;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 10;

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const createdAt = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const { title: city, location } = getRandomItem<City>(this.mockData.cities);
    const thumbnail = getRandomItem<string>(this.mockData.thumbnails);
    const pictures = getRandomItems<string>(this.mockData.pictures).join(';');
    const premium = Math.random() >= 0.5;
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, 1);
    // Вопрос по типам у объекта Аренды, мы делали enum, но с сервака я просто выбираю 1 строчку, как правильно?
    const type = getRandomItem(this.mockData.types);
    const rooms = generateRandomValue(MIN_ROOMS, MAX_ROOMS);
    const guests = generateRandomValue(MIN_GUESTS, MAX_GUESTS);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const conveniences = getRandomItems<string>(this.mockData.conveniences).join(',');
    const username = getRandomItem<string>(this.mockData.usernames); // Посмотри тип в импорте из файла
    const email = getRandomItem<string>(this.mockData.emails);
    const isPro = Math.random() >= 0.5;
    const avatar = getRandomItem<string>(this.mockData.avatars);
    const commentsCounter = generateRandomValue(MIN_COMMENTS, MAX_COMMENTS);

    return [
      title, description, createdAt, city,
      thumbnail, pictures, premium, rating, type,
      rooms, guests, price, conveniences, username,
      email, isPro, avatar, commentsCounter, location
    ].join('\t');
  }
}
