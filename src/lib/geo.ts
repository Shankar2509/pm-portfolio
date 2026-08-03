/** Equirectangular lat/lng → unit-sphere cartesian (Y-up, -Z toward 0°). */
export function latLngToVector3(
  lat: number,
  lng: number,
  radius = 1,
): [number, number, number] {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return [x, y, z];
}
