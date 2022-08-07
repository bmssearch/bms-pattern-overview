import * as fs from "fs";
import * as path from "path";

import { scan } from "../index";
import { ScanError } from "../index";

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

      const pattern = scan(buffer, ext);

      expect(pattern).toEqual(expected);
    });
  });
});

describe("fail safe", () => {
  it("should throw when unsupported extension is specified", () => {
    const filePath = path.resolve(__dirname, "./conventional_sample.bme");
    const buffer = fs.readFileSync(filePath);
    expect(() => scan(buffer, ".jpg")).toThrowError(ScanError);
  });

  it("should throw when .bme is specified for a bmson file", () => {
    const filePath = path.resolve(__dirname, "./bmson_sample.bmson");
    const buffer = fs.readFileSync(filePath);
    expect(() => scan(buffer, ".bme")).toThrowError(ScanError);
  });

  it("should throw when .bmson is specified for a conventional bms file", () => {
    const filePath = path.resolve(__dirname, "./conventional_sample.bme");
    const buffer = fs.readFileSync(filePath);
    expect(() => scan(buffer, ".bmson")).toThrowError(ScanError);
  });
});
