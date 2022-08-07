# bms-pattern-overview

## Usage

```typescript
import { scan, isSupported } from "@bmssearch/bms-pattern-overview";

// const ext: string = file extension including leading period. (eg. `.bme`)
// const buffer: Buffer = read a file.

const overview = scan(buffer, ext);

console.log(overview);
/*
for conventional bms patterns
{
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
  
  laneType: LaneTypeType;
  totalNotes: number;
  bpms: number[];
}

for bmson patterns
{
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
  
  laneType: LaneTypeType;
  totalNotes: number;
  bpms: number[];
}
*/
```
