import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import { Metric } from "./Metric";
import {
  MdxAnchor,
  MdxBlockquote,
  MdxH2,
  MdxOl,
  MdxParagraph,
  MdxStrong,
  MdxTable,
  MdxTd,
  MdxTh,
  MdxUl,
} from "./mdx-elements";

/** Assembled on the server so MDXRemote receives real component references. */
export const caseStudyComponents: MDXRemoteProps["components"] = {
  Metric,
  h2: MdxH2,
  p: MdxParagraph,
  blockquote: MdxBlockquote,
  table: MdxTable,
  th: MdxTh,
  td: MdxTd,
  strong: MdxStrong,
  a: MdxAnchor,
  ul: MdxUl,
  ol: MdxOl,
};
