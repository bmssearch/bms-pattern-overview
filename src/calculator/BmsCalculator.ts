import {
  BMSObjects,
  BPMTimingAction,
  Notes,
  Speedcore,
  TimingAction,
} from "bms";
import { LaneType, LaneTypeType } from "../types/LaneType";

import { SpeedSegment } from "bms/lib/speedcore/segment";
import { conventionalPmsExtensions } from "../extension";

interface TimingSegment extends SpeedSegment {
  bpm: number;
}

export class BmsCalculator {
  public static totalPlayableNotes = (notes: Notes): number => {
    const allNotes = notes.all();
    const playableNotes = allNotes.filter((note) => note.column !== undefined);
    return playableNotes.length;
  };

  public static bpmsFromTimingActions = (
    timingActions: TimingAction[],
    initBpm?: number
  ): number[] => {
    const actionBpms = timingActions
      .filter(
        (timingAction): timingAction is BPMTimingAction =>
          timingAction.type === "bpm"
      )
      .map((bpmTimingAction) => bpmTimingAction.bpm);

    if (initBpm !== undefined) {
      return [initBpm, ...actionBpms];
    } else {
      return actionBpms;
    }
  };

  public static bpmsFromSpeedcore = (
    speedcore: Speedcore<TimingSegment>
  ): number[] => {
    return speedcore._segments.map((segment) => segment.bpm);
  };

  public static laneType = (
    objects: BMSObjects,
    fileExtension?: string
  ): LaneTypeType => {
    // BMS: 1 - 6, 7(FREE ZONE)
    // BME: 1 - 9
    const has1pNotes = objects
      .all()
      .some((obj) => obj.channel.match(/(1|3|5)([1-9])/));
    const has1pBmeNotes = objects
      .all()
      .some((obj) => obj.channel.match(/(1|3|5)([8-9])/));
    const has2pNotes = objects
      .all()
      .some((obj) => obj.channel.match(/(2|4|6)([1-9])/));
    const has2pBmeNotes = objects
      .all()
      .some((obj) => obj.channel.match(/(2|4|6)([8-9])/));

    const hasOnlyPms5KeyNotesOn1p = !objects
      .all()
      .some((obj) => obj.channel.match(/(11|12|16|17)/));

    // a PMS is identical to DP
    // https://hitkey.nekokan.dyndns.info/cmdsJP.htm#PMS
    if (fileExtension && conventionalPmsExtensions.includes(fileExtension)) {
      // PMS 5KEYS(BMS-DP): 13, 14, 15, 22, 23
      // PMS 9KEYS(BMS-DP): 11 - 15, 22 - 25
      // PMS 9KEYS(BME-SP): 11 - 19
      // PMS 18KEYS(BME-DP): 11 - 19, 21 - 29
      if (has2pBmeNotes) {
        return LaneType.P18K;
      } else if (hasOnlyPms5KeyNotesOn1p) {
        return LaneType.P5K;
      } else {
        return LaneType.P9K;
      }
    }

    if (has2pBmeNotes) return LaneType.B14K;
    if (has2pNotes) return LaneType.B10K;

    if (has1pBmeNotes) return LaneType.B7K;
    if (has1pNotes) return LaneType.B5K;

    return LaneType.UNKNOWN;
  };
}
