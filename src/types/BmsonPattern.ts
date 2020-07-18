import { BasePattern } from "./BasePattern";

export type BmsonPattern = BasePattern & {
  version?: string;
  title: string;
  subtitles?: string[];
  artist: string;
  subartists?: string[];
  genre: string;
  modeHint?: string;
  chartName?: string;
  level?: number;
  initBpm?: number;
  judgeRank?: number;
  total?: number;
};
