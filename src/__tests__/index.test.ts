import * as fs from "fs";
import * as path from "path";

import { bmsPatternOverview } from "../main";

const files = fs.readdirSync(path.resolve(__dirname, "./bmses"));
const tsFiles = files.filter((f) => path.extname(f) === ".ts");

describe("e2e", () => {
  tsFiles.forEach((tsFile) => {
    const basename = path.basename(tsFile, ".ts");
    it(`${basename}`, () => {
      const bmses = files.filter(
        (f) =>
          path.basename(f).startsWith(basename) && path.extname(f) !== ".ts"
      );
      if (bmses.length !== 1) {
        throw new Error("one bms file per ts file required");
      }
      const bms = bmses[0];
      const bmsFilePath = path.resolve(__dirname, "./bmses", bms);
      const buffer = fs.readFileSync(bmsFilePath);
      const ext = path.extname(bmsFilePath);

      const tsFilePath = path.resolve(__dirname, "./bmses", tsFile);
      const expected = require(tsFilePath);

      const pattern = bmsPatternOverview(buffer, ext);

      expect(pattern).toBe(expected);
    });
  });
});
