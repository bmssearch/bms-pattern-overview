export const LaneType = {
  B_5K: "B_5K",
  B_7K: "B_7K",
  B_10K: "B_10K",
  B_14K: "B_14K",
  P_5K: "P_5K",
  P_9K: "P_9K",
} as const;

export type LaneTypeType = typeof LaneType[keyof typeof LaneType];
