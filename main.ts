// Two Robots in an Elevator — make.fun entry.
// Writes one line of awkward robot elevator small talk to /output/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line, exactly as the user picked it: one line, at most 200 chars.
// Output contract: the file holds exactly these 82 characters, no trailing
// newline, so the entry file's byte count matches the line length.
const LINE =
  "'This is awkward.' 'Define awkward.' 'Two robots, one lift, zero buttons pressed.'";

const MAX_CHARS = 200;

function main(): void {
  const text = LINE.trim();
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(`line must be 1-${MAX_CHARS} characters, got ${text.length}`);
  }
  if (!/\S/.test(text)) {
    throw new Error("line must not be only white space");
  }
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  // Write the line exactly, with no trailing newline: the gate counts the
  // file's bytes, and a smaller text wins the size tie-break.
  writeFileSync(outPath, text, "utf8");
  console.log(`wrote ${text.length} chars to ${outPath}`);
}

main();
