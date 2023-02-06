import dayjs from 'dayjs';

import { MockData } from '../../types/mock-data.type.js';
import { City } from '../../types/mock-data-city.type.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../utils/random.js';
import { OfferGeneratorInterface } from './offer-generator.interface.js';

enum WeekDays {
  First = 1,
  Last = 7,
}

enum PriceRange {
  Min = 100,
  Max = 10000,
}
enum RatingRange {
  Min = 1,
  Max = 5,
}

enum RoomsRange {
  Min = 1,
  Max = 8,
}

enum GuestsRange {
  Min = 1,
  Max = 10,
}

enum CommentsRange {
  Min = 0,
  Max = 10,
}

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const createdAt = dayjs().subtract(generateRandomValue(WeekDays.First, WeekDays.Last), 'day').toISOString();
    const { title: city, location: { latitude, longitude } } = getRandomItem<City>(this.mockData.cities);
    const thumbnail = getRandomItem<string>(this.mockData.thumbnails);
    const pictures = getRandomItems<string>(this.mockData.pictures).join(';');
    const premium = Math.random() >= 0.5;
    const rating = generateRandomValue(RatingRange.Min, RatingRange.Max, 1);
    const type = getRandomItem(this.mockData.types);
    const rooms = generateRandomValue(RoomsRange.Min, RoomsRange.Max);
    const guests = generateRandomValue(GuestsRange.Min, GuestsRange.Max);
    const price = generateRandomValue(PriceRange.Min, PriceRange.Max).toString();
    const conveniences = getRandomItems<string>(this.mockData.conveniences).join(',');
    const username = getRandomItem<string>(this.mockData.usernames);
    const email = getRandomItem<string>(this.mockData.emails);
    const isPro = Math.random() >= 0.5;
    const avatar = getRandomItem<string>(this.mockData.avatars);
    const commentsCounter = generateRandomValue(CommentsRange.Min, CommentsRange.Max);

    return [
      title, description, createdAt, city,
      thumbnail, pictures, premium, rating, type,
      rooms, guests, price, conveniences, username,
      email, isPro, avatar, commentsCounter, latitude, longitude
    ].join('\t');
  }
}
