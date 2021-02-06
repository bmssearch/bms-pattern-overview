import * as Bmson from "bmson";

import { LaneType, LaneTypeType } from "../types/LaneType";

export class BmsonCalculator {
  public static laneType = (
    modeHint: string | undefined,
    keys: ReturnType<typeof Bmson.keysForBmson>
  ): LaneTypeType => {
    switch (modeHint) {
      case "beat-5k":
        return LaneType.B5K;
      case "beat-7k":
        return LaneType.B7K;
      case "beat-10k":
        return LaneType.B10K;
      case "beat-14k":
        return LaneType.B14K;
      case "popn-5k":
        return LaneType.P5K;
      case "popn-9k":
        return LaneType.P9K;
      case "popn-18k":
        return LaneType.P18K;
      default:
      // through
    }

    switch (keys) {
      case "5K":
        return LaneType.B5K;
      case "10K":
        return LaneType.B10K;
      case "7K":
        return LaneType.B7K;
      case "14K":
        return LaneType.B14K;
      default:
        return LaneType.UNKNOWN;
    }
  };
}
