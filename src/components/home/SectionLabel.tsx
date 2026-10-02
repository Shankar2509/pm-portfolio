type SectionLabelProps = {
  title: string;
  note?: string;
};

/**
 * Full-width hairline with a mono label — makes section gaps read as
 * deliberate structure rather than empty space.
 */
export function SectionLabel({ title, note }: SectionLabelProps) {
  return (
    <div className="border-t border-rule pt-4">
      <p className="font-mono text-xs tracking-wide text-muted uppercase">
        {title}
      </p>
      {note ? (
        <p className="mt-1 max-w-[42rem] font-sans text-sm text-muted">
          {note}
        </p>
      ) : null}
    </div>
  );
}
