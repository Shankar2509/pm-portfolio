/** Static stand-in when WebGL is gated (reduced motion, mobile, save-data). */
export function GlobeFallback() {
  return (
    <div className="mx-auto w-full max-w-[min(28rem,70vw)]">
      <div className="relative aspect-square w-full">
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
      <p className="mt-4 font-mono text-xs text-muted">
        Six apps · five regions
      </p>
    </div>
  );
}
