export const DEFAULT_OFFER_COUNT = 60;

export const VALIDATIONS = {
  title: {
    minLength: 10,
    maxLength: 100,
  },
  description: {
    minLength: 20,
    maxLength: 1024,
  },
  pictures: {
    number: 6,
  },
  rating: {
    min: 1,
    max: 5,
  },
  rooms: {
    min: 1,
    max: 8,
  },
  guests: {
    min: 1,
    max: 10,
  },
  price: {
    min: 100,
    max: 100000,
  },
};

