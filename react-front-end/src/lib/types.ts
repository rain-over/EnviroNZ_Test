// export type Coordinates = [latitude: number, longitude: number];

export type Axis = 'latitude' | 'longitude';

export type Position = [number, number];

export type Suburb = {
  id: number;
  suburbName: string;
  latitude: number;
  longitude: number;
};

export type ActiveLocationType = {
  result: Suburb;
  searched: Position;
};
