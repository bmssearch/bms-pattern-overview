import * as Bms from "bms";

import { castNumber, castString } from "../utils/cast";

import { BmsCalculator } from "../calculator/BmsCalculator";
import { ConventionalPattern } from "../types/Pattern";
import { decode } from "../decoder/decoder";

export const parseConventional = (
  buffer: Buffer,
  fileExtension?: string
): ConventionalPattern => {
  const decoded = decode(buffer);
  const { chart } = Bms.Compiler.compile(decoded);

  const notes = Bms.Notes.fromBMSChart(chart);
  const timing = Bms.Timing.fromBMSChart(chart);
  const songInfo = Bms.SongInfo.fromBMSChart(chart);

  const pattern: ConventionalPattern = {
    format: "conventional",

    laneType: BmsCalculator.laneType(chart.objects, fileExtension),
    totalNotes: BmsCalculator.totalPlayableNotes(notes),
    bpms: BmsCalculator.bpmsFromSpeedcore(timing._speedcore),

    title: songInfo.title,
    subtitles: songInfo.subtitles,
    artist: songInfo.artist,
    subartists: songInfo.subartists,
    genre: songInfo.genre,
    player: castNumber(chart.headers.get("player")),
    rank: castNumber(chart.headers.get("rank")),
    defexrank: castNumber(chart.headers.get("defexrank")),
    maker: castString(chart.headers.get("maker")),
    comment: castString(chart.headers.get("comment")),
    basebpm: castNumber(chart.headers.get("basebpm")),
    bpm: castNumber(chart.headers.get("bpm")),
    playlevel: songInfo.level,
    difficulty: songInfo.difficulty,
    total: castNumber(chart.headers.get("total")),
    lntype: castNumber(chart.headers.get("lntype")),
  };

  return pattern;
};
