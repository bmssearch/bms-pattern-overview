import { bmsonExtensions, conventionalExtensions } from "./extension";

import { Pattern } from "./types/Pattern";
import { parseBmson } from "./parser/bmson";
import { parseConventional } from "./parser/conventional";

export const bmsPatternOverview = (
  buffer: Buffer,
  fileExtension?: string
): Pattern => {
  if (fileExtension && bmsonExtensions.includes(fileExtension)) {
    return parseBmson(buffer);
  }

  if (fileExtension && conventionalExtensions.includes(fileExtension)) {
    return parseConventional(buffer, fileExtension);
  }

  // fallback
  return parseConventional(buffer, fileExtension);
};
