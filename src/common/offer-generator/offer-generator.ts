import dayjs from 'dayjs';

import { MockData } from '../../types/mock-data.type.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../utils/random.js';
import { OfferGeneratorInterface } from './offer-generator.interface.js';

import { PriceRange } from '../../types/price-range.enum.js';
import { WeekDays } from '../../types/week-days.enum.js';
import { RatingRange } from '../../types/rating-range.enum.js';
import { RoomsRange } from '../../types/rooms-range.enum.js';
import { GuestsRange } from '../../types/guests-range.enum.js';
import { City } from '../../types/city.type.js';
import { PasswordRange } from '../../types/password-range.enum.js';

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const createdAt = dayjs().subtract(generateRandomValue(WeekDays.First, WeekDays.Last), 'day').toISOString();
    const city = getRandomItem<City>(this.mockData.cities);
    const thumbnail = getRandomItem<string>(this.mockData.thumbnails);
    const pictures = getRandomItems<string>(this.mockData.pictures).join(';');
    const premium = Math.random() >= 0.5;
    const rating = generateRandomValue(RatingRange.Min, RatingRange.Max, 1);
    const type = getRandomItem(this.mockData.types);
    const rooms = generateRandomValue(RoomsRange.Min, RoomsRange.Max);
    const guests = generateRandomValue(GuestsRange.Min, GuestsRange.Max);
    const price = generateRandomValue(PriceRange.Min, PriceRange.Max).toString();
    const conveniences = getRandomItems<string>(this.mockData.conveniences).join(',');
    const location = getRandomItem<Array<number>>(this.mockData.locations);
    const username = getRandomItem<string>(this.mockData.usernames);
    const email = getRandomItem<string>(this.mockData.emails);
    const isPro = Math.random() >= 0.5;
    const avatar = getRandomItem<string>(this.mockData.avatars);
    const password = generateRandomValue(PasswordRange.Min, PasswordRange.Max).toString();

    const [latitude, longitude] = location;

    return [
      title, description, createdAt, JSON.stringify(city),
      thumbnail, pictures, premium, rating, type,
      rooms, guests, price, conveniences, latitude, longitude, username,
      email, isPro, avatar, password
    ].join('\t');
  }
}
