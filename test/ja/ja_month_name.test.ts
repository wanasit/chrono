import * as chrono from "../../src";
import { testSingleCase } from "../../test/test_util";

test("Test - Complete 12 Traditional Month Names (和風月名)", () => {
  const refDate = new Date(2026, 6 - 1, 15);
  const traditionalMonths = [
    { name: "睦月", monthIndex: 0 },
    { name: "如月", monthIndex: 1 },
    { name: "弥生", monthIndex: 2 },
    { name: "卯月", monthIndex: 3 },
    { name: "皐月", monthIndex: 4 },
    { name: "水無月", monthIndex: 5 },
    { name: "文月", monthIndex: 6 },
    { name: "葉月", monthIndex: 7 },
    { name: "長月", monthIndex: 8 },
    { name: "神無月", monthIndex: 9 },
    { name: "霜月", monthIndex: 10 },
    { name: "師走", monthIndex: 11 },
  ];
  for (const item of traditionalMonths) {
    const text = `${item.name}`;
    const results = chrono.ja.parse(text, refDate);

    expect(results.length).toBe(1);
    const date = results[0].start.date();
    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(item.monthIndex);
    expect(date.getDate()).toBe(1);
  }

  for (const item of traditionalMonths) {
    const text = `${item.name}10日`;
    const results = chrono.ja.parse(text, refDate);

    expect(results.length).toBe(1);
    const date = results[0].start.date();
    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(item.monthIndex);
    expect(date.getDate()).toBe(10);
  }
});
