/** Equirectangular lat/lng → unit-sphere cartesian (Y-up). */
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

/** Inverse of latLngToVector3 — unit vector → geographic degrees. */
export function vector3ToLatLng(
  x: number,
  y: number,
  z: number,
): { lat: number; lng: number } {
  const r = Math.hypot(x, y, z) || 1;
  const phi = Math.acos(Math.min(1, Math.max(-1, y / r)));
  const theta = Math.atan2(z, -x);
  const lat = 90 - (phi * 180) / Math.PI;
  let lng = (theta * 180) / Math.PI - 180;
  if (lng < -180) lng += 360;
  if (lng > 180) lng -= 360;
  return { lat, lng };
}

/** Geographic degrees → equirectangular pixel (u east from −180, v south from +90). */
export function latLngToEquirectUv(
  lat: number,
  lng: number,
  width: number,
  height: number,
): { px: number; py: number } {
  const u = (lng + 180) / 360;
  const v = (90 - lat) / 180;
  const px = Math.min(width - 1, Math.max(0, Math.floor(u * width)));
  const py = Math.min(height - 1, Math.max(0, Math.floor(v * height)));
  return { px, py };
}
