import { Position } from './types';

export const SearchLimit = {
  minLatitude: -37.5,
  maxLatitude: -36.5,
  minLongitude: 174,
  maxLongitude: 175,
} as const;

export const defualtPosition: Position = [-36.8508, 174.7645];
