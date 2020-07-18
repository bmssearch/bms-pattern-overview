import * as Bms from "bms";
import * as Bmson from "bmson";
import * as crypto from "crypto";
import * as iconv from "iconv-lite";
import * as jschardet from "jschardet";

import { castNumber, castString } from "./utils/cast";

import { BmsCalculator } from "./calculators/BmsCalculator";
import { BmsonCalculator } from "./calculators/BmsonCalculator";
import { BmsonPattern } from "./types/BmsonPattern";
import { ConventionalBmsType } from "./types/ConventionalBmsType";
import { ConventionalPattern } from "./types/ConventionalPattern";
import { Format } from "./types/Format";

export default class BmsPatternOverview {
  public static conventional = (
    buffer: Buffer,
    type?: ConventionalBmsType
  ): ConventionalPattern => {
    const bms = Bms.Reader.read(buffer);
    const { chart } = Bms.Compiler.compile(bms);

    const notes = Bms.Notes.fromBMSChart(chart);
    const timing = Bms.Timing.fromBMSChart(chart);
    const songInfo = Bms.SongInfo.fromBMSChart(chart);

    const pattern: ConventionalPattern = {
      format: Format.CONVENTIONAL,

      // TODO: lane type detection
      laneType: BmsCalculator.laneType(chart.objects, type),
      totalNotes: BmsCalculator.totalNotes(notes),
      bpms: BmsCalculator.bpmsFromSpeedcore(timing._speedcore),
      hashMd5: crypto.createHash("md5").update(buffer).digest("hex"),
      hashSha256: crypto.createHash("sha256").update(buffer).digest("hex"),

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

  public static bmson = (buffer: Buffer): BmsonPattern => {
    const charset = jschardet.detect(buffer);
    const decoded = iconv.decode(buffer, charset.encoding);
    const bmson = JSON.parse(decoded);

    const songInfo = Bmson.songInfoForBmson(bmson);
    const notes = Bmson.musicalScoreForBmson(bmson).notes;
    const keys = Bmson.keysForBmson(bmson);
    const timingActions = Bmson.timingInfoForBmson(bmson).actions;

    const initBpm = castNumber(bmson.info.init_bpm);
    const modeHint = castString(bmson.info.mode_hint);

    const laneTypeFromModeHint =
      modeHint && BmsonCalculator.laneTypeFromModeHint(modeHint);
    const laneTypeFromKeys = BmsonCalculator.laneTypeFromKeys(keys);

    const pattern: BmsonPattern = {
      format: Format.BMSON,

      laneType: laneTypeFromModeHint || laneTypeFromKeys,
      totalNotes: notes.count(),
      bpms: BmsCalculator.bpmsFromTimingActions(timingActions, initBpm),
      hashMd5: crypto.createHash("md5").update(buffer).digest("hex"),
      hashSha256: crypto.createHash("sha256").update(buffer).digest("hex"),

      version: castString(bmson.version),
      title: songInfo.title,
      subtitles: songInfo.subtitles,
      artist: songInfo.artist,
      subartists: songInfo.subartists,
      genre: songInfo.genre,
      modeHint,
      chartName: castString(bmson.info.chart_name),
      level: castNumber(bmson.info.level),
      initBpm,
      judgeRank: castNumber(bmson.info.judge_rank),
      total: castNumber(bmson.info.total),
    };

    return pattern;
  };
}
