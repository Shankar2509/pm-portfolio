/** Static stand-in when WebGL is gated (reduced motion, mobile, save-data). */
export function GlobeFallback() {
  return (
    <div className="relative h-[min(28rem,70vw)] w-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/globe/fallback.svg"
        alt="Six streaming apps across five regions — Europe, India, Malaysia, US, and MENA."
        width={640}
        height={400}
        className="h-full w-full object-contain"
        decoding="async"
      />
    </div>
  );
}
