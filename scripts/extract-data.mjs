import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlPath = resolve(__dirname, "../../Deutsch Phrasebook/index.html");
const html = readFileSync(htmlPath, "utf-8");

// Extract the topics array
const topicsMatch = html.match(
	/const topics = ([\s\S]*?);\s*\n\s*\/\/ ── Bangla/,
);
if (!topicsMatch) throw new Error("Could not find topics array");
const topicsCode = topicsMatch[1];
const topics = eval(`(${topicsCode})`);

const cleanTopics = topics.map((t) => ({
	...t,
	groups: t.groups.map((g) => ({
		...g,
		phrases: g.phrases.map(([de, en]) => ({ de, en })),
	})),
}));

// Extract bnCache
const bnCacheMatch = html.match(/const bnCache = ([\s\S]*?);\s*\n\s*let isBN/);
if (!bnCacheMatch) throw new Error("Could not find bnCache");
const bnCacheCode = bnCacheMatch[1];
console.log("bnCache snippet:", bnCacheCode.slice(0, 100));
const bnTranslations = eval(`(${bnCacheCode})`);

// Extract group title translations
const groupStart = html.indexOf("function translateGroupTitle");
const mapStart = html.indexOf("const map = {", groupStart);
const mapEnd = html.indexOf("};", mapStart) + 2;
const groupTitleCode = html.substring(
	html.indexOf("{", mapStart),
	html.indexOf("}", mapStart) + 1,
);
const bnGroupTitles = eval(`(${groupTitleCode})`);

// Write output files
const outDir = resolve(__dirname, "../src/data");
writeFileSync(
	resolve(outDir, "topics.json"),
	JSON.stringify(cleanTopics, null, 2),
);
writeFileSync(
	resolve(outDir, "bn-translations.json"),
	JSON.stringify(bnTranslations, null, 2),
);
writeFileSync(
	resolve(outDir, "bn-group-titles.json"),
	JSON.stringify(bnGroupTitles, null, 2),
);

console.log("Done! Extracted:");
console.log(`  topics: ${cleanTopics.length}`);
console.log(`  bnTranslations: ${Object.keys(bnTranslations).length}`);
console.log(`  bnGroupTitles: ${Object.keys(bnGroupTitles).length}`);
