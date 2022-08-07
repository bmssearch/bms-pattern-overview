import {
  bmsonExtensions,
  conventionalExtensions,
  supportedExtensions,
} from "./extension";

import { Pattern } from "./types/Pattern";
import { parseBmson } from "./parser/bmson";
import { parseConventional } from "./parser/conventional";
import { ScanError } from "./types/errors";

export const isSupported = (fileExtension: string): boolean => {
  return supportedExtensions.includes(fileExtension);
};

export const scan = (buffer: Buffer, fileExtension: string): Pattern => {
  if (bmsonExtensions.includes(fileExtension)) {
    return parseBmson(buffer);
  }

  if (conventionalExtensions.includes(fileExtension)) {
    return parseConventional(buffer, fileExtension);
  }

  throw new ScanError(`File extension "${fileExtension}" is not supported.`);
};
