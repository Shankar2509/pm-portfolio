"use client";

import {
  Children,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { slugifyHeading } from "@/lib/headings";
import {
  Reveal,
  headingRevealKind,
  proseRevealKind,
} from "./Reveal";
import {
  classifyHeading,
  useSectionApi,
} from "./SectionContext";

function textFromChildren(children: ReactNode): string {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") {
        return String(child);
      }
      if (isValidElement<{ children?: ReactNode }>(child)) {
        return textFromChildren(child.props.children);
      }
      return "";
    })
    .join("");
}

function isStandaloneBold(children: ReactNode): boolean {
  const items = Children.toArray(children).filter((child) => {
    if (typeof child === "string") {
      return child.trim().length > 0;
    }
    return true;
  });

  if (items.length !== 1) return false;

  const only = items[0];
  return isValidElement(only) && only.type === "strong";
}

const breakoutClass = "max-w-[min(40rem,100%)] text-lg text-ink";

export function MdxH2({ children }: ComponentPropsWithoutRef<"h2">) {
  const { setType } = useSectionApi();
  const text = textFromChildren(children);
  const type = classifyHeading(text);
  setType(type);

  return (
    <Reveal
      kind={headingRevealKind(type)}
      as="h2"
      id={slugifyHeading(text)}
      className="font-display text-3xl text-ink mt-14 mb-5 scroll-mt-24 first:mt-0"
    >
      {children}
    </Reveal>
  );
}

export function MdxParagraph({ children }: ComponentPropsWithoutRef<"p">) {
  const { getType } = useSectionApi();
  const type = getType();

  if (isStandaloneBold(children)) {
    return (
      <Reveal
        kind="breakout"
        as="p"
        className={`${breakoutClass} my-8 font-sans`}
      >
        {children}
      </Reveal>
    );
  }

  return (
    <Reveal
      kind={proseRevealKind(type)}
      as="p"
      className="my-4 text-base text-ink"
    >
      {children}
    </Reveal>
  );
}

export function MdxBlockquote({
  children,
}: ComponentPropsWithoutRef<"blockquote">) {
  return (
    <Reveal
      kind="breakout"
      as="blockquote"
      className={`${breakoutClass} my-10 border-l border-rule pl-6 font-display italic`}
    >
      {children}
    </Reveal>
  );
}

export function MdxTable(props: ComponentPropsWithoutRef<"table">) {
  const { getType } = useSectionApi();

  return (
    <Reveal
      kind={proseRevealKind(getType())}
      className="my-8 w-full overflow-x-auto"
    >
      <table
        className="w-full border-collapse text-left text-sm text-ink"
        {...props}
      />
    </Reveal>
  );
}

export function MdxTh(props: ComponentPropsWithoutRef<"th">) {
  return (
    <th
      className="border-b border-rule px-0 py-3 pr-6 font-sans font-medium text-ink"
      {...props}
    />
  );
}

export function MdxTd(props: ComponentPropsWithoutRef<"td">) {
  return (
    <td
      className="border-b border-rule px-0 py-3 pr-6 align-top text-ink"
      {...props}
    />
  );
}

export function MdxStrong(props: ComponentPropsWithoutRef<"strong">) {
  return <strong className="font-medium text-ink" {...props} />;
}

export function MdxAnchor(props: ComponentPropsWithoutRef<"a">) {
  return (
    <a
      className="text-accent underline-offset-4 hover:underline"
      {...props}
    />
  );
}

export function MdxUl(props: ComponentPropsWithoutRef<"ul">) {
  const { getType } = useSectionApi();
  return (
    <Reveal kind={proseRevealKind(getType())} className="my-4">
      <ul className="list-disc space-y-2 pl-5 text-base text-ink" {...props} />
    </Reveal>
  );
}

export function MdxOl(props: ComponentPropsWithoutRef<"ol">) {
  const { getType } = useSectionApi();
  return (
    <Reveal kind={proseRevealKind(getType())} className="my-4">
      <ol
        className="list-decimal space-y-2 pl-5 text-base text-ink"
        {...props}
      />
    </Reveal>
  );
}
