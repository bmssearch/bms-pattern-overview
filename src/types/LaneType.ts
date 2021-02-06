export const LaneType = {
  B5K: "B5K",
  B7K: "B7K",
  B10K: "B10K",
  B14K: "B14K",
  P5K: "P5K",
  P9K: "P9K",
  P18K: "P18K",
  UNKNOWN: "UNKNOWN",
} as const;

export type LaneTypeType = typeof LaneType[keyof typeof LaneType];
