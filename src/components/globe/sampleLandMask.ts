import { latLngToVector3 } from "@/lib/geo";

const LAND_MASK_URL = "/globe/land-mask.png";

/** Land is dark (0) on the mask; ocean is light (255). */
const LAND_THRESHOLD = 128;
/** Pixel stride — keeps instance count in the ~10–15k range. */
const SAMPLE_STEP = 2;
const GLOBE_RADIUS = 1;

let cached: Float32Array | null = null;
let inflight: Promise<Float32Array> | null = null;

function sampleFromImageData(imageData: ImageData): Float32Array {
  const { width, height, data } = imageData;
  const positions: number[] = [];

  for (let y = 0; y < height; y += SAMPLE_STEP) {
    const lat = 90 - (y / (height - 1)) * 180;
    for (let x = 0; x < width; x += SAMPLE_STEP) {
      const i = (y * width + x) * 4;
      const luminance = data[i]!;
      if (luminance >= LAND_THRESHOLD) continue;
      const lng = -180 + (x / (width - 1)) * 360;
      const [px, py, pz] = latLngToVector3(lat, lng, GLOBE_RADIUS);
      positions.push(px, py, pz);
    }
  }

  return new Float32Array(positions);
}

/**
 * Load the equirectangular land-mask and return packed xyz positions
 * for a single InstancedMesh (x,y,z,x,y,z,…).
 */
export async function loadLandPositions(): Promise<Float32Array> {
  if (cached) return cached;
  if (inflight) return inflight;

  inflight = (async () => {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Failed to load land-mask.png"));
      el.src = LAND_MASK_URL;
    });

    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) throw new Error("2D canvas unavailable for land-mask sampling");
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    cached = sampleFromImageData(imageData);
    return cached;
  })();

  try {
    return await inflight;
  } finally {
    inflight = null;
  }
}

export const GLOBE_RADIUS_UNITS = GLOBE_RADIUS;
