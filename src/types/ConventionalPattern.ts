import { BasePattern } from "./BasePattern";

export type ConventionalPattern = BasePattern & {
  title: string;
  subtitles?: string[];
  artist: string;
  subartists?: string[];
  genre: string;
  player?: number;
  rank?: number;
  defexrank?: number;
  maker?: string;
  comment?: string;
  basebpm?: number;
  bpm?: number;
  playlevel?: number;
  difficulty?: number;
  total?: number;
  lntype?: number;
};
