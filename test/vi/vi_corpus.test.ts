/**
 * WikiWars-VI corpus accuracy test for the Vietnamese (vi) locale.
 * Corpus: 1132 annotated temporal expressions extracted from 19 Vietnamese
 * Wikipedia war articles, covering full_date, month_year, year_only,
 * slash_date, and bc_year expression types.
 */
import * as chrono from "../../src/";
import { readFileSync } from "fs";
import { join } from "path";

const FIXTURE_FILE = join(__dirname, "fixtures/wikiwars_vi_curated.json");

interface Fixture {
    doc: string;
    text: string;
    val: string;
    type: string;
    context: string;
}

function parseVal(val: string): { year: number; month?: number; day?: number } | null {
    const bc = val.match(/^BC(\d{4})(?:-(\d{2}))?$/);
    if (bc) return { year: -parseInt(bc[1]), month: bc[2] ? parseInt(bc[2]) : undefined };
    const full = val.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (full) return { year: parseInt(full[1]), month: parseInt(full[2]), day: parseInt(full[3]) };
    const ym = val.match(/^(\d{4})-(\d{2})$/);
    if (ym) return { year: parseInt(ym[1]), month: parseInt(ym[2]) };
    const y = val.match(/^(\d{4})$/);
    if (y) return { year: parseInt(y[1]) };
    return null;
}

const fixtures: Fixture[] = JSON.parse(readFileSync(FIXTURE_FILE, "utf-8"));

test("fixtures loaded", () => {
    expect(fixtures.length).toBeGreaterThan(100);
});

test("WikiWars-VI accuracy", () => {
    const byType: Record<string, { hits: number; total: number }> = {};
    const missed: string[] = [];
    let totalHits = 0;
    let totalCount = 0;

    for (const f of fixtures) {
        const expected = parseVal(f.val);
        if (!expected) continue;

        const results = chrono.vi.casual.parse(f.text);
        const hit = results.some((r) => {
            if (r.start.get("year") !== expected.year) return false;
            if (expected.month !== undefined && r.start.get("month") !== expected.month) return false;
            if (expected.day !== undefined && r.start.get("day") !== expected.day) return false;
            return true;
        });

        const bucket = byType[f.type] ?? { hits: 0, total: 0 };
        bucket.total++;
        if (hit) {
            bucket.hits++;
            totalHits++;
        } else if (missed.length < 10) {
            missed.push(`[${f.type}] "${f.text}" → ${f.val}`);
        }
        byType[f.type] = bucket;
        totalCount++;
    }

    console.log(`\n=== WikiWars-VI Accuracy (chrono.vi) ===`);
    console.log(`Overall: ${totalHits}/${totalCount} (${((totalHits / totalCount) * 100).toFixed(1)}%)`);
    for (const [type, { hits, total }] of Object.entries(byType).sort((a, b) => b[1].total - a[1].total)) {
        console.log(`  ${type}: ${hits}/${total} (${((hits / total) * 100).toFixed(1)}%)`);
    }
    if (missed.length > 0) {
        console.log("Sample misses:");
        missed.forEach((m) => console.log(`  - ${m}`));
    }

    expect(totalHits / totalCount).toBeGreaterThan(0.85);
});
