import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../lib/i18n.ts", import.meta.url), "utf8");
const dictionaries = new Map();
let failed = false;

for (const locale of ["en", "vi"]) {
  const match = source.match(new RegExp(`^  ${locale}: \\{\\r?\\n([\\s\\S]*?)^  \\},`, "m"));
  if (!match) {
    console.error(`Could not find ui.${locale} dictionary in lib/i18n.ts`);
    process.exitCode = 1;
    continue;
  }

  const entries = new Map();
  const entryPattern = /(?:^|,)\s*(\w+):\s*"((?:\\.|[^"\\])*)"/gm;
  for (const [, key, rawValue] of match[1].matchAll(entryPattern)) {
    const value = JSON.parse(`"${rawValue}"`);
    entries.set(key, value);
    if (!value.trim()) {
      console.error(`Empty value for ${locale}.${key}`);
      failed = true;
    }
  }
  dictionaries.set(locale, entries);
}

const english = dictionaries.get("en");
const vietnamese = dictionaries.get("vi");
if (english && vietnamese) {
  for (const key of vietnamese.keys()) {
    if (!english.has(key)) {
      console.error(`Missing English key: ${key}`);
      failed = true;
    }
  }
  for (const key of english.keys()) {
    if (!vietnamese.has(key)) {
      console.error(`English key has no Vietnamese counterpart: ${key}`);
      failed = true;
    }
  }

  for (const [key, englishValue] of english) {
    if (!vietnamese.has(key)) continue;
    const placeholders = (value) => [...value.matchAll(/\{([^{}]+)\}/g)].map(([, name]) => name).sort();
    const englishPlaceholders = placeholders(englishValue);
    const vietnamesePlaceholders = placeholders(vietnamese.get(key));
    if (JSON.stringify(englishPlaceholders) !== JSON.stringify(vietnamesePlaceholders)) {
      console.error(`Placeholder mismatch for ${key}: en {${englishPlaceholders.join(", ")}}; vi {${vietnamesePlaceholders.join(", ")}}`);
      failed = true;
    }
  }

  if (!failed) {
    console.log(`check:i18n: OK (en: ${english.size} keys; vi: ${vietnamese.size} keys)`);
  }
}

if (failed || process.exitCode) process.exit(1);
