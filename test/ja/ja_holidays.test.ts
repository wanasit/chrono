import * as chrono from "../../src";
import { testSingleCase } from "../../test/test_util";

test.each([
  ["元旦", new Date(2023, 1 - 1, 1, 12)],
  ["元日", new Date(2023, 1 - 1, 1, 12)],
  ["正月", new Date(2023, 1 - 1, 1, 12)],
  ["お正月", new Date(2023, 1 - 1, 1, 12)],
  ["ひなまつり", new Date(2023, 3 - 1, 3, 12)],
  ["ひな祭り", new Date(2023, 3 - 1, 3, 12)],
  ["雛祭り", new Date(2023, 3 - 1, 3, 12)],
  ["桃の節句", new Date(2023, 3 - 1, 3, 12)],
  ["子どもの日", new Date(2023, 5 - 1, 5, 12)],
  ["子供の日", new Date(2023, 5 - 1, 5, 12)],
  ["２０２６年のこどものひ", new Date(2026, 5 - 1, 5, 12)],
  ["こどものひ", new Date(2023, 5 - 1, 5, 12)],
  ["大晦日", new Date(2022, 12 - 1, 31, 12)],
  ["来年のお正月", new Date(2024, 1 - 1, 1, 12)],
  ["西暦2026年元旦", new Date(2026, 0, 1, 12)],
  ["2026年元旦", new Date(2026, 0, 1, 12)],
  ["西暦2026年睦月10日", new Date(2026, 0, 10, 12)],
  ["2026年睦月10日", new Date(2026, 0, 10, 12)],
  ["令和8年のこどものひ", new Date(2026, 5 - 1, 5, 12)],
])("Test - Japanese named holidays: %s", (text: string, expectedDate: Date) => {
  const refDate = new Date(2023, 6 - 1, 14, 12);
  testSingleCase(chrono.ja, text, refDate, (result) => {
    expect(result.text).toBe(text);
    expect(result.start).toBeDate(expectedDate);
  });
});

test("Test - era holiday compound without connective is one item", () => {
  const text = "令和8年元旦";
  const refDate = new Date(2026, 1 - 1, 30, 12);
  testSingleCase(chrono.ja, text, refDate, (result) => {
    expect(result.text).toBe(text);
    expect(result.start).toBeDate(new Date(2026, 1 - 1, 1, 12));
  });
});

test("Test Kana Children's Day", () => {
  const refDate = new Date(2023, 5 - 1, 14, 12);
  testSingleCase(chrono.ja, "こどものひ", refDate, (result) => {
    expect(result.text).toBe("こどものひ");
    expect(result.start).toBeDate(new Date(2023, 5 - 1, 5, 12));
  });
});

describe("false holiday friends test", () => {
  test.each([
    ["正月", "正月休み"],
    ["お正月", "お正月飾り"],
    ["ひなまつり", "ひなまつり会"],
    ["ひな祭り", "ひな祭りケーキ"],
    ["雛祭り", "雛祭り人形"],
    ["桃の節句", "桃の節句弁当"],
    ["元旦", "元旦マラソン"],
  ])(
    "Test - Japanese named holidays: %s vs %s",
    (text: string, text2: string) => {
      const results = chrono.ja.parse(text);
      expect(results).toHaveLength(1);
      const results2 = chrono.ja.parse(text2);
      expect(results2).toHaveLength(0);
    },
  );
});
