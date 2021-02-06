import { bmsPatternOverview } from "../main";
import { extname } from "path";
import { readFileSync } from "fs";

const path = process.env.BMS_PATH;

if (!path) {
  throw new Error("specify BMS_PATH");
}

(async () => {
  const buffer = readFileSync(path);
  const ext = extname(path);
  const res = bmsPatternOverview(buffer, ext);
  console.log(res);
})();
