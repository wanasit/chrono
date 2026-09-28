import * as chrono from "../../src";
import { testSingleCase } from "../../test/test_util";

const REF_DATE = new Date(2023, 6 - 1, 14, 12);
const REF_DATE_2026 = new Date(2026, 7 - 1, 21, 12);

test.each([
  ["一昨日", new Date(2023, 6 - 1, 12, 12)],
  ["おととい", new Date(2023, 6 - 1, 12, 12)],
  ["二日前", new Date(2023, 6 - 1, 12, 12)],
  ["明後日", new Date(2023, 6 - 1, 16, 12)],
  ["翌々日", new Date(2023, 6 - 1, 16, 12)],
  ["あさって", new Date(2023, 6 - 1, 16, 12)],
  ["3日後", new Date(2023, 6 - 1, 17, 12)],
])("Test - relative days: %s", (text: string, expectedDate: Date) => {
  testSingleCase(chrono.ja, text, REF_DATE, (result) => {
    expect(result.text).toBe(text);
    expect(result.start).toBeDate(expectedDate);
  });
});

test.each([
  ["先々週", new Date(2023, 5 - 1, 31, 12)],
  ["先週", new Date(2023, 6 - 1, 7, 12)],
  ["今週", new Date(2023, 6 - 1, 14, 12)],
  ["来週", new Date(2023, 6 - 1, 21, 12)],
  ["2週間後", new Date(2023, 6 - 1, 28, 12)],
  ["先月", new Date(2023, 5 - 1, 14, 12)],
  ["今月", new Date(2023, 6 - 1, 14, 12)],
  ["来月", new Date(2023, 7 - 1, 14, 12)],
  ["去年", new Date(2022, 6 - 1, 14, 12)],
  ["昨年", new Date(2022, 6 - 1, 14, 12)],
  ["来年", new Date(2024, 6 - 1, 14, 12)],
])(
  "Test - relative weeks, months, and years: %s",
  (text: string, expectedDate: Date) => {
    testSingleCase(chrono.ja, text, REF_DATE, (result) => {
      expect(result.text).toBe(text);
      expect(result.start).toBeDate(expectedDate);
    });
  },
);

test.each([
  ["来週の月曜日", new Date(2026, 7 - 1, 27, 12)],
  ["先々週の水曜日", new Date(2026, 7 - 1, 8, 12)],
  ["来月の15日", new Date(2026, 8 - 1, 15, 12)],
  ["先月の１日", new Date(2026, 6 - 1, 1, 12)],
  ["去年の１１月１日", new Date(2025, 11 - 1, 1, 12)],
  ["一昨年の９月８日", new Date(2024, 9 - 1, 8, 12)],
])(
  "Test - compound relative date phrase: %s",
  (text: string, expectedDate: Date) => {
    testSingleCase(chrono.ja, text, REF_DATE_2026, (result) => {
      expect(result.text).toBe(text);
      expect(result.start).toBeDate(expectedDate);
    });
  },
);

test.each([
  ["来週月曜日", new Date(2026, 7 - 1, 27, 12)],
  ["去年11月11日", new Date(2025, 11 - 1, 11, 12)],
  ["昨年弥生３日", new Date(2025, 3 - 1, 3, 12)],
])(
  "Test - compound relative date phrases without connective: %s",
  (text: string, expectedDate: Date) => {
    testSingleCase(chrono.ja, text, REF_DATE_2026, (result) => {
      expect(result.text).toBe(text);
      expect(result.start).toBeDate(expectedDate);
    });
  },
);

test.each([
  {
    description: "August to September",
    refDate: new Date(2026, 8 - 1, 31, 12),
    cases: [["来月の5日", new Date(2026, 9 - 1, 5, 12)]] as Array<
      [string, Date]
    >,
  },
  {
    description: "January to February (Year Wrap / End of Month)",
    refDate: new Date(2026, 1 - 1, 31, 12),
    cases: [["来月の8日", new Date(2026, 2 - 1, 8, 12)]] as Array<
      [string, Date]
    >,
  },
  {
    description: "December to January (Year Wrap )",
    refDate: new Date(2025, 12 - 1, 30, 12),
    cases: [["来月の9日", new Date(2026, 1 - 1, 9, 12)]] as Array<
      [string, Date]
    >,
  },
])("Next month test - $description", ({ refDate, cases }) => {
  for (const [text, expectedDate] of cases) {
    testSingleCase(chrono.ja, text, refDate, (result) => {
      expect(result.text).toBe(text);
      expect(result.start).toBeDate(expectedDate);
    });
  }
});

test("Test - next month day without connective across month boundary", () => {
  const text = "来月7日";
  const refDate = new Date(2026, 1 - 1, 30, 12);
  testSingleCase(chrono.ja, text, refDate, (result) => {
    expect(result.text).toBe(text);
    expect(result.start).toBeDate(new Date(2026, 2 - 1, 7, 12));
  });
});

test.each([
  ["2か月後", new Date(2023, 8 - 1, 14, 12)],
  ["二ヶ月前", new Date(2023, 4 - 1, 14, 12)],
  ["3年後", new Date(2026, 6 - 1, 14, 12)],
  ["三年前", new Date(2020, 6 - 1, 14, 12)],
])(
  "Test - numeric month and year offsets: %s",
  (text: string, expectedDate: Date) => {
    testSingleCase(chrono.ja, text, REF_DATE, (result) => {
      expect(result.text).toBe(text);
      expect(result.start).toBeDate(expectedDate);
    });
  },
);

test.each([
  ["2日後", new Date(2026, 1 - 1, 30, 12), new Date(2026, 2 - 1, 1, 12)],
  ["二日前", new Date(2026, 1 - 1, 1, 12), new Date(2025, 12 - 1, 30, 12)],
])(
  "Test - numeric day offset crosses month boundary: %s",
  (text: string, refDate: Date, expectedDate: Date) => {
    testSingleCase(chrono.ja, text, refDate, (result) => {
      expect(result.text).toBe(text);
      expect(result.start).toBeDate(expectedDate);
    });
  },
);

test.each([
  ["先々月", new Date(2023, 4 - 1, 14, 12)],
  ["再来月", new Date(2023, 8 - 1, 14, 12)],
  ["一昨年", new Date(2021, 6 - 1, 14, 12)],
  ["再来年", new Date(2025, 6 - 1, 14, 12)],
])(
  "Test - two-period named month and year offsets: %s",
  (text: string, expectedDate: Date) => {
    testSingleCase(chrono.ja, text, REF_DATE, (result) => {
      expect(result.text).toBe(text);
      expect(result.start).toBeDate(expectedDate);
    });
  },
);

describe("Test - Correctly handles + 3 instances", () => {
  test.each([
    ["明々後日", new Date(2026, 7 - 1, 21 + 3)],
    ["しあさって", new Date(2026, 7 - 1, 21 + 3)],
  ])("+3 Day Expressions: %s", (text: string, expectedDate: Date) => {
    const refDate = new Date(2026, 6, 21);
    const results = chrono.ja.parse(text, refDate);
    expect(Number(results.length)).toBe(1);
    expect(results[0].text).toBe(text);
    const date = results[0].start.date();
    expect(date.getFullYear()).toBe(expectedDate.getFullYear());
    expect(date.getMonth()).toBe(expectedDate.getMonth());
    expect(date.getDate()).toBe(expectedDate.getDate());
  });
});
