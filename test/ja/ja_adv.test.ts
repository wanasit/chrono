import * as chrono from "../../src";
import { testUnexpectedResult } from "../../test/test_util";

test.each([
  ["大晦日の昼に蕎麦を食べる", new Date(2026, 12 - 1, 31)],
  ["来年の子供の日に野球見にいく", new Date(2027, 5 - 1, 5)],
  ["令和８年の元旦", new Date(2026, 1 - 1, 1)],
  ["令和８年元旦", new Date(2026, 1 - 1, 1)],
  ["令和8年の1月1日", new Date(2026, 1 - 1, 1)],
  ["去年の睦月10日", new Date(2025, 1 - 1, 10)],
  ["令和９年の元日に初売りに行く", new Date(2027, 1 - 1, 1)],
  ["来年のひな祭り", new Date(2027, 3 - 1, 3)],
  ["令和6年の大晦日", new Date(2024, 12 - 1, 31)],
  ["2026年のこどものひ", new Date(2026, 5 - 1, 5)],
  ["令和8年元旦夕方", new Date(2026, 1 - 1, 1, 18)],
])(
  "Test - New Year Holidays / Special Days: %s",
  (text: string, expectedDate: Date) => {
    const refDate = new Date(2026, 7 - 1, 21);
    const results = chrono.ja.parse(text, refDate);
    expect(results).toHaveLength(1);
    const date = results[0].start.date();
    expect(date.getFullYear()).toBe(expectedDate.getFullYear());
    expect(date.getMonth()).toBe(expectedDate.getMonth());
    expect(date.getDate()).toBe(expectedDate.getDate());
  },
);

test.each([
  [
    "去年に旅行して、睦月10日に改めて行った。",
    new Date(2025, 7 - 1, 21),
    new Date(2027, 1 - 1, 10),
  ],
  [
    "来年に引っ越してから、元旦にお祝いする。",
    new Date(2027, 7 - 1, 21),
    new Date(2027, 1 - 1, 1),
  ],
  [
    "令和8年の３月３１日に卒業して、師走25日に再会した。",
    new Date(2026, 3 - 1, 31),
    new Date(2026, 12 - 1, 25),
  ],
  [
    "西暦2026年５月15日に契約し、大晦日に引渡しが行われる。",
    new Date(2026, 5 - 1, 15),
    new Date(2026, 12 - 1, 31),
  ],
  [
    "先週に連絡を受け取ったが、来月の15日に出席する。",
    new Date(2026, 7 - 1, 14),
    new Date(2026, 8 - 1, 15),
  ],
  [
    "一昨年に家を建てて、3月1日に引越し完了した。",
    new Date(2024, 7 - 1, 21),
    new Date(2026, 3 - 1, 1),
  ],
  ["来年年元旦", new Date(2027, 7 - 1, 21), new Date(2027, 1 - 1, 1)],
])(
  "Test - Avoid false merge: %s",
  (text: string, expectedDate1: Date, expectedDate2: Date) => {
    const refDate = new Date(2026, 7 - 1, 21, 12);
    const results = chrono.ja.parse(text, refDate);
    expect(results).toHaveLength(2);
    const date1 = results[0].start.date();
    expect(date1.getFullYear()).toBe(expectedDate1.getFullYear());
    expect(date1.getMonth()).toBe(expectedDate1.getMonth());
    expect(date1.getDate()).toBe(expectedDate1.getDate());
    const date2 = results[1].start.date();
    expect(date2.getFullYear()).toBe(expectedDate2.getFullYear());
    expect(date2.getMonth()).toBe(expectedDate2.getMonth());
    expect(date2.getDate()).toBe(expectedDate2.getDate());
  },
);

test.each([
  ["明治元年10月23日", new Date(1868, 10 - 1, 23)],
  ["明治45年7月30日", new Date(1912, 7 - 1, 30)],
  ["大正元年8月1日", new Date(1912, 8 - 1, 1)],
  ["大正14年5月5日", new Date(1925, 5 - 1, 5)],
])(
  "Test - Pre-Showa Imperial Eras (明治, 大正): %s",
  (text: string, expectedDate: Date) => {
    const results = chrono.ja.parse(text);

    expect(results).toHaveLength(1);

    const date = results[0].start.date();
    expect(date.getFullYear()).toBe(expectedDate.getFullYear());
    expect(date.getMonth()).toBe(expectedDate.getMonth());
    expect(date.getDate()).toBe(expectedDate.getDate());
  },
);

test.each([
  ["3日前に注文しました", new Date(2026, 7 - 1, 18)],
  ["10日後に発送", new Date(2026, 7 - 1, 31)],
])(
  "Test - Numeric Offsets (日前 / 日後): %s",
  (text: string, expectedDate: Date) => {
    const refDate = new Date(2026, 7 - 1, 21);
    const results = chrono.ja.parse(text, refDate);

    expect(results).toHaveLength(1);

    const date = results[0].start.date();
    expect(date.getFullYear()).toBe(expectedDate.getFullYear());
    expect(date.getMonth()).toBe(expectedDate.getMonth());
    expect(date.getDate()).toBe(expectedDate.getDate());
  },
);

describe("Strict Mode Behavior Tests", () => {
  const refDate = new Date(2026, 7 - 1, 31, 9);
  const checkSet = [
    ["今週", new Date(2026, 7 - 1, 31)],
    ["元旦", new Date(2027, 1 - 1, 1)],
    ["明々後日", new Date(2026, 8 - 1, 3)],
    ["長月", new Date(2026, 9 - 1, 1)],
    ["神無月2日", new Date(2026, 10 - 1, 2)],
    ["昼", new Date(2026, 7 - 1, 31, 12)],
  ];

  describe("Strict mode evaluation: should return in standard", () => {
    test.each(checkSet)(
      "%s (works in standard)",
      (text: string, expectedDate: Date) => {
        const results = chrono.ja.parse(text, refDate);
        expect(results).toHaveLength(1);

        const parsedDate = results[0].date();
        expect(parsedDate.getFullYear()).toBe(expectedDate.getFullYear());
        expect(parsedDate.getMonth()).toBe(expectedDate.getMonth());
        expect(parsedDate.getDate()).toBe(expectedDate.getDate());

        if (text === "昼") {
          expect(parsedDate.getHours()).toBe(expectedDate.getHours());
        }
      },
    );
    test.each(checkSet)(" %s (fails in strict)", (text: string) => {
      expect(chrono.ja.parse(text, refDate)).toHaveLength(1);
      expect(chrono.ja.strict.parse(text, refDate)).toHaveLength(0);
    });
  });
});

describe("Strict: Imperial Calendar Checks", () => {
  test.each([
    ["明治１０年10月23日", new Date(1877, 10 - 1, 23, 12)],
    ["大正元年08月23日", new Date(1912, 8 - 1, 23, 12)],
    ["令和元年水無月０１日", new Date(2019, 6 - 1, 1, 12)],
  ])(
    "Test - Japanese Locale Dates with explicit strictMode %s",
    (text: string, expectedDate: Date) => {
      expect(chrono.ja.parse(text).length).toBeGreaterThan(0);
      const strictResult = chrono.ja.strict.parse(text);
      expect(strictResult).toHaveLength(1);
      expect(strictResult[0].start.date()).toEqual(expectedDate);
    },
  );
});

describe("Strict: Morning / Midday / Evening Fully Qualified Works", () => {
  test.each([
    ["2024年7月１３日の朝9時", new Date(2024, 7 - 1, 13, 9)],
    ["令和元年水無月０１日夕方５時", new Date(2019, 6 - 1, 1, 17)],
    ["令和元年水無月０１日夕方17時", new Date(2019, 6 - 1, 1, 17)],
    ["2026年7月31日の朝", new Date(2026, 7 - 1, 31, 9)],
    ["2026年7月31日の昼", new Date(2026, 7 - 1, 31, 12)],
    ["2026年7月31日の夕方", new Date(2026, 7 - 1, 31, 18)],
  ])(
    "Test - Japanese Locale Dates with explicit strictMode %s",
    (text: string, expectedDate: Date) => {
      const refDate = new Date(2026, 7 - 1, 21);

      expect(chrono.ja.parse(text, refDate).length).toBeGreaterThan(0);
      const strictResult = chrono.ja.strict.parse(text, refDate);
      expect(strictResult).toHaveLength(1);
      expect(strictResult[0].text).toBe(text);
      expect(strictResult[0].start.date()).toEqual(expectedDate);
    },
  );
});

describe("Japanese Western Year Notation (西暦)", () => {
  const refDate = new Date(2026, 7 - 1, 21);

  test.each([
    ["西暦2026年7月21日", new Date(2026, 7 - 1, 21, 12)],
    ["西暦1603年1月1日", new Date(1603, 1 - 1, 1, 12)],
    ["西暦2026年如月2日", new Date(2026, 2 - 1, 2, 12)],
  ])(
    "Test - Japanese Western Year Notation %s",
    (text: string, expectedDate: Date) => {
      const result = chrono.ja.parse(text, refDate);
      expect(result).toHaveLength(1);
      expect(result[0].text).toBe(text);

      const strictResult = chrono.ja.strict.parse(text);
      expect(strictResult).toHaveLength(1);
      expect(strictResult[0].start.date()).toEqual(expectedDate);
    },
  );
});

describe("JPStandardParser Regression Tests", () => {
  const refDate = new Date(2026, 7 - 1, 21);

  test("Relative prefixes do not introduce regression", () => {
    const text = "会議は一昨年の3月1日でした";
    const results = chrono.ja.parse(text, refDate);
    expect(results).toHaveLength(1);
    expect(results[0].start.get("year")).toBe(2024);
    expect(results[0].start.get("month")).toBe(3);
    expect(results[0].start.get("day")).toBe(1);

    testUnexpectedResult(chrono.ja, "13月5日", refDate);
    testUnexpectedResult(chrono.ja, "2012年13月5日", refDate);
  });
});

describe("Block Incoherent Double Era", () => {
  test.each([
    ["令和8年1月1日", "西暦令和8年1月1日"],
    ["令和６年1月1日", "昭和令和６年1月1日"],
    ["昭和5年1月1日", "平成昭和5年1月1日"],
    ["2026年1月1日", "令和西暦2026年1月1日"],
    ["平成10年1月1日", "西暦平成10年1月1日"],
    ["大正5年1月1日", "明治大正5年1月1日"],
    ["明治10年1月1日", "大正明治10年1月1日"],
    ["昭和20年1月1日", "大正昭和20年1月1日"],
    ["令和2年1月1日", "平成令和2年1月1日"],
    ["平成5年1月1日", "令和平成5年1月1日"],
  ])("Parse %s and reject %s", (text: string, text2: string) => {
    const results = chrono.ja.parse(text);
    expect(results).toHaveLength(1);
    const results2 = chrono.ja.parse(text2);
    expect(results2).toHaveLength(0);
  });
});

test.each([
  ["西暦2026年師走15日の夕方7時", new Date(2026, 12 - 1, 15, 19)],
  ["来年の霜月20日", new Date(2027, 11 - 1, 20, 12)],
  ["再来年の大晦日の昼0時", new Date(2028, 12 - 1, 31, 12)],
  ["令和8年の11月11日の朝10時", new Date(2026, 11 - 1, 11, 10)],
  ["2年後の3月4日", new Date(2028, 3 - 1, 4, 12)],
  ["2か月後の7日", new Date(2026, 9 - 1, 7, 12)],
  ["3か月前の５日", new Date(2026, 4 - 1, 5, 12)],
])(
  "Test - Deep matrix combinations: %s",
  (text: string, expectedDate: Date) => {
    const refDate = new Date(2026, 7 - 1, 21);
    const results = chrono.ja.parse(text, refDate);
    expect(results).toHaveLength(1);
    const date = results[0].start.date();
    expect(date.getFullYear()).toBe(expectedDate.getFullYear());
    expect(date.getMonth()).toBe(expectedDate.getMonth());
    expect(date.getDate()).toBe(expectedDate.getDate());
    expect(date.getHours()).toBe(expectedDate.getHours());
  },
);
