import * as chrono from "../../src";

test("Parse Hindi absolute date", () => {
    const results = chrono.hi.parse("5 मई 2026");

    expect(results.length).toBeGreaterThan(0);
    expect(results[0].start.get("day")).toBe(5);
    expect(results[0].start.get("month")).toBe(5);
    expect(results[0].start.get("year")).toBe(2026);
});

test("Parse Hindi digits date", () => {
    const results = chrono.hi.parse("५ मई २०२६");

    expect(results.length).toBeGreaterThan(0);
    expect(results[0].start.get("day")).toBe(5);
    expect(results[0].start.get("month")).toBe(5);
    expect(results[0].start.get("year")).toBe(2026);
});

test("Parse आज", () => {
    const results = chrono.hi.parse("आज");

    expect(results.length).toBeGreaterThan(0);
});

test("Parse अभी", () => {
    const results = chrono.hi.parse("अभी");

    expect(results.length).toBeGreaterThan(0);
});

test("Parse बीता कल", () => {
    const results = chrono.hi.parse("बीता कल");

    expect(results.length).toBeGreaterThan(0);
});

test("Parse आने वाला कल", () => {
    const results = chrono.hi.parse("आने वाला कल");

    expect(results.length).toBeGreaterThan(0);
});

test("Parse Hindi sentence date", () => {
    const results = chrono.hi.parse("परीक्षा 5 मई 2026 को होगी");

    expect(results.length).toBeGreaterThan(0);
    expect(results[0].start.get("day")).toBe(5);
});

test("Parse basic Hindi time (बजे)", () => {
    const results = chrono.hi.parse("५ बजे");

    expect(results.length).toBeGreaterThan(0);
    expect(results[0].start.get("hour")).toBe(5);
    expect(results[0].start.get("minute")).toBe(0);
});

test("Parse time with minutes", () => {
    const results = chrono.hi.parse("10:30 बजे");

    expect(results.length).toBeGreaterThan(0);
    expect(results[0].start.get("hour")).toBe(10);
    expect(results[0].start.get("minute")).toBe(30);
});

test("Parse PM time (शाम)", () => {
    const results = chrono.hi.parse("शाम ५ बजे");

    expect(results.length).toBeGreaterThan(0);
    expect(results[0].start.get("hour")).toBe(17); // 5 PM is 17:00 in 24hr format
    expect(results[0].start.get("meridiem")).toBe(1); // 1 = PM
});

test("Parse AM time (सुबह)", () => {
    const results = chrono.hi.parse("सुबह 10:15");

    expect(results.length).toBeGreaterThan(0);
    expect(results[0].start.get("hour")).toBe(10);
    expect(results[0].start.get("minute")).toBe(15);
    expect(results[0].start.get("meridiem")).toBe(0); // 0 = AM
});

test("Parse Combined Date and Time", () => {
    const results = chrono.hi.parse("5 मई 2026 शाम 4 बजे");

    expect(results.length).toBeGreaterThan(0);
    expect(results[0].start.get("day")).toBe(5);
    expect(results[0].start.get("month")).toBe(5);
    expect(results[0].start.get("year")).toBe(2026);
    expect(results[0].start.get("hour")).toBe(16);
});
