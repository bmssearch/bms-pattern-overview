import {
  BMSObjects,
  BPMTimingAction,
  Notes,
  Speedcore,
  TimingAction,
} from "bms";
import { LaneType, LaneTypeType } from "../types/LaneType";

import { ConventionalBmsType } from "../types/ConventionalBmsType";
import { SpeedSegment } from "bms/lib/speedcore/segment";

interface TimingSegment extends SpeedSegment {
  bpm: number;
}

export class BmsCalculator {
  public static laneType = (
    objects: BMSObjects,
    type?: ConventionalBmsType
  ): LaneTypeType => {
    const objects_1p_visible = objects
      .all()
      .filter((obj) => obj.channel.match(/1([1-9]|[A-Z])/))
      .map((v) => v.channel);
    const objects_1p_invisible = objects
      .all()
      .filter((obj) => obj.channel.match(/3([1-9]|[A-Z])/))
      .map((v) => v.channel);
    const objects_1p_longnote = objects
      .all()
      .filter((obj) => obj.channel.match(/5([1-9]|[A-Z])/))
      .map((v) => v.channel);

    const objects_2p_visible = objects
      .all()
      .filter((obj) => obj.channel.match(/2([1-9]|[A-Z])/))
      .map((v) => v.channel);
    const objects_2p_invisible = objects
      .all()
      .filter((obj) => obj.channel.match(/4([1-9]|[A-Z])/))
      .map((v) => v.channel);
    const objects_2p_longnote = objects
      .all()
      .filter((obj) => obj.channel.match(/6([1-9]|[A-Z])/))
      .map((v) => v.channel);

    return LaneType.B_10K;
  };

  public static totalNotes = (notes: Notes): number => {
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
}
