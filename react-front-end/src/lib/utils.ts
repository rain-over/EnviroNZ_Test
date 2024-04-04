const degreesToRadians = (degrees: number) => (degrees * Math.PI) / 180;

/**
 * using Haversine Formula
 */
export const getDistanceBetweenMarkers = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const earthRadiusKm = 6371; // Radius of the Earth in kilometers

  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(lat1)) *
      Math.cos(degreesToRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadiusKm * c;

  return distance;
};

export const is_numberInRange = (
  value: number,
  min: number,
  max: number
): boolean => {
  return value >= min && value <= max;
};

export const capitalize = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);
