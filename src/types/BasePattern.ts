import { FormatType } from "./Format";
import { LaneTypeType } from "./LaneType";

export type BasePattern = {
  format: FormatType;
  laneType?: LaneTypeType;
  totalNotes: number;
  bpms: number[];
  hashMd5: string;
  hashSha256: string;
};
