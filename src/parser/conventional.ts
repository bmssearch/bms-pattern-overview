import * as Bms from "bms";

import { castNumber, castString } from "../utils/cast";

import { BmsCalculator } from "../calculator/BmsCalculator";
import { ConventionalPattern } from "../types/Pattern";
import { decode } from "../decoder/decoder";
import { ScanError } from "../types/errors";

const CHART_MAPPING = {
  "11": "11",
  "12": "12",
  "13": "13",
  "14": "14",
  "15": "15",
  "18": "16",
  "19": "17",
  "16": "1SC",
  "21": "11",
  "22": "12",
  "23": "13",
  "24": "14",
  "25": "15",
  "28": "16",
  "29": "17",
  "26": "1SC",
};

export const parseConventional = (
  buffer: Buffer,
  fileExtension: string
): ConventionalPattern => {
  const decoded = decode(buffer);
  const { chart } = Bms.Compiler.compile(decoded);

  let isJSON = false;
  try {
    JSON.parse(decoded);
    isJSON = true;
  } catch (err) {
    // pass
  }

  if (isJSON) {
    throw new ScanError("Failed to parse as JSON.");
  }

  const notes = Bms.Notes.fromBMSChart(chart, { mapping: CHART_MAPPING });
  const timing = Bms.Timing.fromBMSChart(chart);
  const songInfo = Bms.SongInfo.fromBMSChart(chart);

  const pattern: ConventionalPattern = {
    format: "conventional",

    laneType: BmsCalculator.laneType(chart.objects, fileExtension),
    totalNotes: BmsCalculator.totalPlayableNotes(notes),
    bpms: BmsCalculator.bpmsFromSpeedcore(timing._speedcore),

    title: castString(chart.headers.get("title")) || "",
    subtitles: chart.headers.getAll("subtitle") || [],
    artist: castString(chart.headers.get("artist")) || "",
    subartists: chart.headers.getAll("subartist") || [],
    genre: castString(chart.headers.get("genre")) || "",
    player: castNumber(chart.headers.get("player")),
    rank: castNumber(chart.headers.get("rank")),
    defexrank: castNumber(chart.headers.get("defexrank")),
    maker: castString(chart.headers.get("maker")),
    comment: castString(chart.headers.get("comment")),
    basebpm: castNumber(chart.headers.get("basebpm")),
    bpm: castNumber(chart.headers.get("bpm")),
    level: songInfo.level,
    difficulty: songInfo.difficulty,
    total: castNumber(chart.headers.get("total")),
    lntype: castNumber(chart.headers.get("lntype")),
  };

  return pattern;
};
