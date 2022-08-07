import * as Bmson from "bmson";

import { castNumber, castString } from "../utils/cast";

import { BmsCalculator } from "../calculator/BmsCalculator";
import { BmsonCalculator } from "../calculator/BmsonCalculator";
import { BmsonPattern } from "../types/Pattern";
import { decode } from "../decoder/decoder";
import { ScanError } from "../types/errors";

export const parseBmson = (buffer: Buffer): BmsonPattern => {
  const decoded = decode(buffer);

  let bmson: any;
  try {
    bmson = JSON.parse(decoded);
  } catch (err) {
    throw new ScanError("Failed to parse as JSON.");
  }

  const songInfo = Bmson.songInfoForBmson(bmson);
  const notes = Bmson.musicalScoreForBmson(bmson).notes;
  const keys = Bmson.keysForBmson(bmson);
  const timingActions = Bmson.timingInfoForBmson(bmson).actions;

  const initBpm = castNumber(bmson.info.init_bpm);
  const modeHint = castString(bmson.info.mode_hint);

  const pattern: BmsonPattern = {
    format: "bmson",

    laneType: BmsonCalculator.laneType(modeHint, keys),

    totalNotes: BmsCalculator.totalPlayableNotes(notes),
    bpms: BmsCalculator.bpmsFromTimingActions(timingActions, initBpm),

    version: castString(bmson.version),
    title: songInfo.title,
    subtitles: songInfo.subtitles,
    artist: songInfo.artist,
    subartists: songInfo.subartists,
    genre: songInfo.genre,
    modeHint,
    chartName: castString(bmson.info.chart_name),
    level: castNumber(bmson.info.level) || 0,
    initBpm,
    judgeRank: castNumber(bmson.info.judge_rank),
    total: castNumber(bmson.info.total),
  };

  return pattern;
};
