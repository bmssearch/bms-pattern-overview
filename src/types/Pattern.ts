import { LaneTypeType } from "./LaneType";

type Meta = {
  laneType: LaneTypeType;
  totalNotes: number;
  bpms: number[];
};

export type ConventionalPattern = Meta & {
  format: "conventional";
  title: string;
  subtitles: string[];
  artist: string;
  subartists: string[];
  genre: string;
  player?: number;
  rank?: number;
  defexrank?: number;
  maker?: string;
  comment?: string;
  basebpm?: number;
  bpm?: number;
  level: number;
  difficulty: number;
  total?: number;
  lntype?: number;
};

export type BmsonPattern = Meta & {
  format: "bmson";
  version?: string;
  title: string;
  subtitles: string[];
  artist: string;
  subartists: string[];
  genre: string;
  modeHint?: string;
  chartName?: string;
  level: number;
  initBpm?: number;
  judgeRank?: number;
  total?: number;
};

export type Pattern = ConventionalPattern | BmsonPattern;
