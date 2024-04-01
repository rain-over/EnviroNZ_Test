import { Position } from './types';

export const SearchLimit = {
  minLatitude: -37.5,
  maxLatitude: -36.5,
  minLongitude: 174,
  maxLongitude: 175,
} as const;

export const defaultPosition: Position = [-36.8508, 174.7645];

export const step: number = 0.00001;
