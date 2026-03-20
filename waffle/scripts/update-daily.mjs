import { writeFile } from "node:fs/promises";

const SOURCE_URL = "https://wafflegame.net/daily1.txt";
const OUTPUT_PATH = new URL("../daily.js", import.meta.url);

function decodePayload(rawText) {
  const trimmed = rawText.trim();

  if (!trimmed) {
    throw new Error("The Waffle response was empty.");
  }

  if (trimmed.startsWith("{")) {
    return JSON.parse(trimmed);
  }

  const decoded = Buffer.from(trimmed.includes("`") ? trimmed.split("`")[1] : trimmed, "base64").toString("utf16le");
  return JSON.parse(decoded);
}

function buildStoredPuzzle(payload) {
  const puzzle = String(payload.puzzle || "").replace(/[^A-Za-z]/g, "").toUpperCase();
  const solution = String(payload.solution || "").replace(/[^A-Za-z]/g, "").toUpperCase();

  if (puzzle.length !== 21) {
    throw new Error(`Expected 21 puzzle letters, received ${puzzle.length}.`);
  }

  if (solution.length !== 21) {
    throw new Error(`Expected 21 solution letters, received ${solution.length}.`);
  }

  return {
    number: payload.number,
    date: payload.date,
    nextPuzzle: payload.nextPuzzle,
    puzzle,
    solution,
    words: Array.isArray(payload.words) ? payload.words : [],
    sourceUrl: SOURCE_URL,
    fetchedAt: new Date().toISOString()
  };
}

const response = await fetch(SOURCE_URL, {
  headers: {
    "User-Agent": "waffle-github-pages-updater"
  }
});

if (!response.ok) {
  throw new Error(`Failed to fetch ${SOURCE_URL}: ${response.status} ${response.statusText}`);
}

const payload = decodePayload(await response.text());
const storedPuzzle = buildStoredPuzzle(payload);

const output = `window.DAILY_PUZZLE = ${JSON.stringify(storedPuzzle, null, 2)};\n`;
await writeFile(OUTPUT_PATH, output, "utf8");
console.log(`Wrote Daily Waffle #${storedPuzzle.number} to daily.js`);
