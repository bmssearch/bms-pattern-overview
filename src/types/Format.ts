export const Format = {
  CONVENTIONAL: "CONVENTIONAL",
  BMSON: "BMSON",
} as const;

export type FormatType = typeof Format[keyof typeof Format];
