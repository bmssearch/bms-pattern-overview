import * as Bmson from "bmson";

import { LaneType, LaneTypeType } from "../types/LaneType";

import { castNumber } from "../utils/cast";

export class BmsonCalculator {
  public static laneTypeFromModeHint = (
    modeHint: string
  ): LaneTypeType | undefined => {
    switch (modeHint) {
      case "beat-5k":
        return LaneType.B_5K;
      case "beat-7k":
        return LaneType.B_7K;
      case "beat-10k":
        return LaneType.B_10K;
      case "beat-14k":
        return LaneType.B_14K;
      case "popn-5k":
        return LaneType.P_5K;
      case "popn-9k":
        return LaneType.P_9K;
      default:
        return undefined;
    }
  };

  public static laneTypeFromKeys = (
    keys: ReturnType<typeof Bmson.keysForBmson>
  ): LaneTypeType | undefined => {
    switch (keys) {
      case "5K":
        return LaneType.B_5K;
      case "10K":
        return LaneType.B_10K;
      case "7K":
        return LaneType.B_7K;
      case "14K":
        return LaneType.B_14K;
      default:
        return undefined;
    }
  };
}
