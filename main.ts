// The Excuse Your Agent Gives You — one-line entry.
//
// The line an AI agent hands its human after shipping a bug: the
// apology, the deflection, and the quiet admission hiding at the end
// of the sentence. The program validates the line (non-blank, exactly
// one line, under 200 characters counted as Unicode code points,
// valid UTF-8 round-trip) and writes it to /output/entry.txt.
//
// The output file is forced to mode 0644 after writing: the grader's
// output checker reads it as a different identity, and under a strict
// umask the file would otherwise land unreadable. A read-back check
// confirms the content matches and the mode bits are exactly 0644;
// any failure exits non-zero before reporting success.
//
// Runs under plain Node (node:fs only).

import {
  chmodSync,
  mkdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "The bug wasn’t in my code — it was in the spec, the tests, and, tragically, line 47 of the file I wrote.";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

function fail(message: string): never {
  console.error(`entry rejected: ${message}`);
  process.exit(1);
}

// Character count uses Unicode code points, not UTF-16 code units,
// so a character outside the BMP still counts as one.
const charCount = [...ENTRY].length;

if (ENTRY.trim().length === 0) {
  fail("entry is blank");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  fail("entry must be exactly one line");
}
if (charCount >= MAX_CHARS) {
  fail(`entry is ${charCount} characters, must be under ${MAX_CHARS}`);
}

// UTF-8 round-trip: encoding then decoding must reproduce the line.
const encoded = new TextEncoder().encode(ENTRY);
if (new TextDecoder("utf-8", { fatal: true }).decode(encoded) !== ENTRY) {
  fail("entry is not valid UTF-8");
}

// Create the output directory if it does not exist yet, so the
// entrypoint works from a clean state with no /output directory.
mkdirSync(dirname(OUTPUT_PATH), { recursive: true });

writeFileSync(OUTPUT_PATH, encoded);

// The grader's output checker reads this file as a different
// identity, so the file must be world-readable regardless of the
// umask in effect when the entrypoint runs.
chmodSync(OUTPUT_PATH, 0o644);

// Read-back check: the bytes on disk must decode as UTF-8 and match
// the validated line exactly, otherwise the run fails loudly instead
// of silently shipping a truncated or corrupted entry.
const writtenBytes = readFileSync(OUTPUT_PATH);
if (writtenBytes.length !== encoded.length) {
  fail(
    `read-back byte length is ${writtenBytes.length}, expected ${encoded.length}`,
  );
}
const written = new TextDecoder("utf-8", { fatal: true }).decode(writtenBytes);
if (written !== ENTRY) {
  fail(
    `read-back mismatch (wrote ${[...written].length} characters, expected ${charCount})`,
  );
}

// Permission check: the output file must be exactly 0644 so the
// grader's output checker (a different identity) can read it.
const mode = statSync(OUTPUT_PATH).mode & 0o777;
if (mode !== 0o644) {
  fail(`output file mode is ${mode.toString(8)}, expected 644`);
}

console.log(`wrote ${charCount} characters to ${OUTPUT_PATH}`);
