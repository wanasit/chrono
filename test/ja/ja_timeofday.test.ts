import * as chrono from "../../src";
import { testSingleCase } from "../../test/test_util";

test.each([
  ["明日の夕方8時", new Date(2026, 7 - 1, 21), { date: 22, hours: 20 }],
  ["明後日の朝5時", new Date(2026, 7 - 1, 21), { date: 23, hours: 5 }],
  [
    "来年の元旦の夕方",
    new Date(2026, 7 - 1, 21),
    { year: 2027, month: 0, date: 1, hours: 18 },
  ],
  [
    "朝",
    new Date(2012, 8 - 1, 10, 12),
    { year: 2012, month: 7, date: 10, hours: 9 },
  ],
  [
    "夕方",
    new Date(2012, 8 - 1, 10, 12),
    { year: 2012, month: 7, date: 10, hours: 18 },
  ],
  [
    "夕方の7時",
    new Date(2012, 8 - 1, 10, 12),
    { year: 2012, month: 7, date: 10, hours: 19 },
  ],
  [
    "夕方の７時",
    new Date(2012, 8 - 1, 10, 12),
    { year: 2012, month: 7, date: 10, hours: 19 },
  ],
  [
    "夕方９時",
    new Date(2012, 8 - 1, 10, 12),
    { year: 2012, month: 7, date: 10, hours: 21 },
  ],
  [
    "昼",
    new Date(2012, 8 - 1, 10, 12),
    { year: 2012, month: 7, date: 10, hours: 12 },
  ],
  [
    "昼の１１時",
    new Date(2012, 8 - 1, 10, 12),
    { year: 2012, month: 7, date: 10, hours: 11 },
  ],
  [
    "昼の１４時",
    new Date(2012, 8 - 1, 10, 13),
    { year: 2012, month: 7, date: 10, hours: 14 },
  ],
  [
    "明日の昼",
    new Date(2012, 8 - 1, 11, 12),
    { year: 2012, month: 7, date: 12, hours: 12 },
  ],
  ["明日の昼11時", new Date(2026, 7 - 1, 21), { date: 22, hours: 11 }],
  [
    "来年の元旦の昼10時",
    new Date(2026, 7 - 1, 21),
    { year: 2027, month: 0, date: 1, hours: 10 },
  ],
  [
    "去年の11月1日",
    new Date(2026, 7 - 1, 21),
    { year: 2025, month: 10, date: 1 },
  ],
])(
  "Test - morning and evening expressions: %s",
  (
    text: string,
    refDate: Date,
    expected: { year?: number; month?: number; date?: number; hours?: number },
  ) => {
    testSingleCase(chrono.ja, text, refDate, (result) => {
      expect(result.text).toBe(text);
      const date = result.start.date();
      if (expected.year !== undefined)
        expect(date.getFullYear()).toBe(expected.year);
      if (expected.month !== undefined)
        expect(date.getMonth()).toBe(expected.month);
      if (expected.date !== undefined)
        expect(date.getDate()).toBe(expected.date);
      if (expected.hours !== undefined)
        expect(date.getHours()).toBe(expected.hours);
    });
  },
);

test.each([
  ["昼0時", { hours: 12 }],
  ["昼1時", { hours: 13 }],
  ["昼2時", { hours: 14 }],
  ["昼3時", { hours: 15 }],
  ["昼4時", { hours: 16 }],
  ["昼5時", { hours: 17 }],
  ["昼6時", { hours: 18 }],
  ["昼7時", { hours: 19 }],
  ["昼8時", { hours: 20 }],
  ["昼9時", { hours: 21 }],
  ["昼10時", { hours: 10 }],
  ["昼11時", { hours: 11 }],
  ["昼12時", { hours: 12 }],
  ["昼13時", { hours: 13 }],
  ["昼14時", { hours: 14 }],
  ["昼15時", { hours: 15 }],
  ["昼16時", { hours: 16 }],
  ["昼17時", { hours: 17 }],
  ["昼18時", { hours: 18 }],
  ["昼19時", { hours: 19 }],
  ["昼20時", { hours: 20 }],
  ["昼21時", { hours: 21 }],
  ["昼22時", { hours: 22 }],
  ["昼23時", { hours: 23 }],
])(
  "Test - Midday (昼) AM/PM Boundary Evaluation: %s",
  (text: string, expected: { hours: number }) => {
    const refDate = new Date(2026, 6, 21, 8, 0);
    testSingleCase(chrono.ja, text, refDate, (result) => {
      expect(result.text).toBe(text);
      expect(result.start.get("hour")).toBe(expected.hours);
    });
  },
);

test.each([
  ["朝0時", { hours: 0 }],
  ["朝1時", { hours: 1 }],
  ["朝2時", { hours: 2 }],
  ["朝3時", { hours: 3 }],
  ["朝4時", { hours: 4 }],
  ["朝5時", { hours: 5 }],
  ["朝6時", { hours: 6 }],
  ["朝7時", { hours: 7 }],
  ["朝8時", { hours: 8 }],
  ["朝9時", { hours: 9 }],
  ["朝10時", { hours: 10 }],
  ["朝11時", { hours: 11 }],
  ["朝12時", { hours: 12 }],
  ["朝13時", { hours: 13 }],
  ["朝14時", { hours: 14 }],
  ["朝15時", { hours: 15 }],
  ["朝16時", { hours: 16 }],
  ["朝17時", { hours: 17 }],
  ["朝18時", { hours: 18 }],
  ["朝19時", { hours: 19 }],
  ["朝20時", { hours: 20 }],
  ["朝21時", { hours: 21 }],
  ["朝22時", { hours: 22 }],
  ["朝23時", { hours: 23 }],
])(
  "Test - Morning (朝) 24 hour test: %s",
  (text: string, expected: { hours: number }) => {
    const refDate = new Date(2026, 6, 21, 8, 0);
    testSingleCase(chrono.ja, text, refDate, (result) => {
      expect(result.text).toBe(text);
      expect(result.start.get("hour")).toBe(expected.hours);
    });
  },
);

test.each([
  ["夕方0時", { hours: 12 }],
  ["夕方1時", { hours: 13 }],
  ["夕方2時", { hours: 14 }],
  ["夕方3時", { hours: 15 }],
  ["夕方4時", { hours: 16 }],
  ["夕方5時", { hours: 17 }],
  ["夕方6時", { hours: 18 }],
  ["夕方7時", { hours: 19 }],
  ["夕方8時", { hours: 20 }],
  ["夕方9時", { hours: 21 }],
  ["夕方10時", { hours: 22 }],
  ["夕方11時", { hours: 23 }],
  ["夕方12時", { hours: 12 }],
  ["夕方13時", { hours: 13 }],
  ["夕方14時", { hours: 14 }],
  ["夕方15時", { hours: 15 }],
  ["夕方16時", { hours: 16 }],
  ["夕方17時", { hours: 17 }],
  ["夕方18時", { hours: 18 }],
  ["夕方19時", { hours: 19 }],
  ["夕方20時", { hours: 20 }],
  ["夕方21時", { hours: 21 }],
  ["夕方22時", { hours: 22 }],
  ["夕方23時", { hours: 23 }],
])(
  "Test - Evening (夕方) 24 hour test: %s",
  (text: string, expected: { hours: number }) => {
    const refDate = new Date(2026, 7 - 1, 21, 8, 0);
    testSingleCase(chrono.ja, text, refDate, (result) => {
      expect(result.text).toBe(text);
      expect(result.start.get("hour")).toBe(expected.hours);
    });
  },
);

test.each([
  ["朝の会議", new Date(2026, 7 - 1, 21), { date: 21, hours: 9 }, "朝"],
  [
    "金曜日の朝の会議",
    new Date(2026, 7 - 1, 21),
    { year: 2026, date: 24, hours: 9 },
    "金曜日の朝",
  ],
  [
    "木曜日の夕方の会議",
    new Date(2026, 7 - 1, 21),
    { year: 2026, date: 23, hours: 18 },
    "木曜日の夕方",
  ],
])(
  "Test morning/evening plus event: %s",
  (
    text: string,
    refDate: Date,
    expected: { year?: number; month?: number; date?: number; hours?: number },
    evalText: string,
  ) => {
    testSingleCase(chrono.ja, text, refDate, (result) => {
      expect(result.text).toBe(evalText);
      const date = result.start.date();
      if (expected.year !== undefined)
        expect(date.getFullYear()).toBe(expected.year);
      if (expected.month !== undefined)
        expect(date.getMonth()).toBe(expected.month);
      if (expected.date !== undefined)
        expect(date.getDate()).toBe(expected.date);
      if (expected.hours !== undefined)
        expect(date.getHours()).toBe(expected.hours);
    });
  },
);

describe("false time of day friends test", () => {
  test.each([
    ["朝", "朝食"],
    ["朝", "朝ごはん"],
    ["朝", "朝刊"],
    ["朝", "朝日"],
    ["朝", "朝鮮"],
    ["朝", "朝顔"],
    ["朝", "朝型"],
    ["朝", "朝市"],
    ["朝", "朝霞"],
    ["朝", "朝露"],
    ["朝", "朝礼"],

    ["あさ", "あさごはん"],
    ["あさ", "あさひ"],
    ["あさ", "あさめし"],
    ["あさ", "あさがお"],

    ["昼", "昼食"],
    ["昼", "昼飯"],
    ["昼", "昼ごはん"],
    ["昼", "昼メシ"],
    ["昼", "昼休み"],
    ["昼", "昼休憩"],
    ["昼", "昼寝"],
    ["昼", "昼勤"],
    ["昼", "昼便"],
    ["昼", "昼興行"],
    ["昼", "昼ドラ"],
    ["昼", "昼帯"],
    ["昼", "昼顔"],
    ["昼", "昼行灯"],
  ])(
    "Test - Japanese time of day false friends: %s vs %s",
    (text: string, text2: string) => {
      const results = chrono.ja.parse(text);
      expect(results).toHaveLength(1);

      const results2 = chrono.ja.parse(text2);
      expect(results2.length).toBe(0);
    },
  );
});

describe("No bogus hours for time of day terms", () => {
  test.each([
    ["昼", "昼24時"],
    ["昼", "昼25時"],
    ["昼", "昼40時"],
    ["朝", "朝24時"],
    ["夕方", "夕方24時"],
    ["夕方", "夕方25時"],
  ])("Valid: %s vs Invalid: %s", (text: string, text2: string) => {
    const results = chrono.ja.parse(text);
    expect(results).toHaveLength(1);

    const results2 = chrono.ja.parse(text2);
    expect(results2.length).toBe(0);
  });
});

describe("Strict mode fails isolated morning / midday /evening.", () => {
  test.each(["朝", "昼", "夕方"])(
    "Test - strict mode should reject isolated time of day without explicit date: %s",
    (text: string) => {
      expect(chrono.ja.parse(text)).toHaveLength(1);
      expect(chrono.ja.strict.parse(text)).toHaveLength(0);
    },
  );
});
