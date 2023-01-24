export const cities = ['Amsterdam', 'Dusseldorf', 'Brussels', 'Cologne', 'Paris', 'Hamburg'] as const;

export type Cities = typeof cities[number];
