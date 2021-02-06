import * as iconv from "iconv-lite";
import * as jschardet from "jschardet";

import isUtf8 from "is-utf8";

export const decode = (buffer: Buffer): string => {
  if (isUtf8(buffer)) {
    return iconv.decode(buffer, "UTF-8");
  }

  const charset = jschardet.detect(buffer, { minimumThreshold: 0.97 });
  if (charset.encoding) {
    return iconv.decode(buffer, charset.encoding);
  }

  // fallback to ShiftJIS
  return iconv.decode(buffer, "SHIFT-JIS");
};
