import { createParsingComponentsAtWeekday, getDaysToWeekday } from "../src/common/calculation/weekdays";
import { Weekday } from "../src";
import { ReferenceWithTimezone } from "../src/results";

test("Test - This Weekday Calculation", () => {
    {
        const reference = new ReferenceWithTimezone(new Date("Sat, 20 Aug 2022 12:00:00"));
        const output = createParsingComponentsAtWeekday(reference, Weekday.MONDAY, "this");
        expect(output.date()).toStrictEqual(new Date("Mon, Aug 22 2022 12:00:00"));
    }
    {
        const reference = new ReferenceWithTimezone(new Date("Sun, 21 Aug 2022 12:00:00"));
        const output = createParsingComponentsAtWeekday(reference, Weekday.FRIDAY, "this");
        expect(output.date()).toStrictEqual(new Date("Fri, Aug 26 2022 12:00:00"));
    }
    {
        const reference = new ReferenceWithTimezone(new Date("Tue, Aug 2 2022 12:00:00"));
        const output = createParsingComponentsAtWeekday(reference, Weekday.SUNDAY, "this");
        expect(output.date()).toStrictEqual(new Date("Sun, Aug 7 2022 12:00:00"));
    }
});

test("Test - Last Weekday Calculation", () => {
    {
        const reference = new ReferenceWithTimezone(new Date("Sat, 20 Aug 2022 12:00:00"));
        const output = createParsingComponentsAtWeekday(reference, Weekday.FRIDAY, "last");
        expect(output.date()).toStrictEqual(new Date("Fri, Aug 19 2022 12:00:00"));
    }
    {
        const reference = new ReferenceWithTimezone(new Date("Sat, 20 Aug 2022 12:00:00"));
        const output = createParsingComponentsAtWeekday(reference, Weekday.MONDAY, "last");
        expect(output.date()).toStrictEqual(new Date("Mon, Aug 15 2022 12:00:00"));
    }
    {
        const reference = new ReferenceWithTimezone(new Date("Sat, 20 Aug 2022 12:00:00"));
        const output = createParsingComponentsAtWeekday(reference, Weekday.SUNDAY, "last");
        expect(output.date()).toStrictEqual(new Date("Sun, Aug 14 2022 12:00:00"));
    }
    {
        const reference = new ReferenceWithTimezone(new Date("Sat, 20 Aug 2022 12:00:00"));
        const output = createParsingComponentsAtWeekday(reference, Weekday.SATURDAY, "last");
        expect(output.date()).toStrictEqual(new Date("Sat, Aug 13 2022 12:00:00"));
    }
});

test("Test - Next Weekday Calculation", () => {
    {
        const reference = new ReferenceWithTimezone(new Date("Sun, Aug 21 2022 12:00:00"));
        const output = createParsingComponentsAtWeekday(reference, Weekday.MONDAY, "next");
        expect(output.date()).toStrictEqual(new Date("Mon, Aug 22 2022 12:00:00"));
    }
    {
        const reference = new ReferenceWithTimezone(new Date("Sun, Aug 21 2022 12:00:00"));
        const output = createParsingComponentsAtWeekday(reference, Weekday.SATURDAY, "next");
        expect(output.date()).toStrictEqual(new Date("Sat, Aug 27 2022 12:00:00"));
    }
    {
        const reference = new ReferenceWithTimezone(new Date("Sun, Aug 21 2022 12:00:00"));
        const output = createParsingComponentsAtWeekday(reference, Weekday.SUNDAY, "next");
        expect(output.date()).toStrictEqual(new Date("Sun, Aug 28 2022 12:00:00"));
    }
    {
        const reference = new ReferenceWithTimezone(new Date("Sat, Aug 20 2022 12:00:00"));
        const output = createParsingComponentsAtWeekday(reference, Weekday.FRIDAY, "next");
        expect(output.date()).toStrictEqual(new Date("Fri, Aug 26 2022 12:00:00"));
    }
    {
        const reference = new ReferenceWithTimezone(new Date("Sat, Aug 20 2022 12:00:00"));
        const output = createParsingComponentsAtWeekday(reference, Weekday.SATURDAY, "next");
        expect(output.date()).toStrictEqual(new Date("Sat, Aug 27 2022 12:00:00"));
    }
    {
        const reference = new ReferenceWithTimezone(new Date("Sat, Aug 20 2022 12:00:00"));
        const output = createParsingComponentsAtWeekday(reference, Weekday.SUNDAY, "next");
        expect(output.date()).toStrictEqual(new Date("Sun, Aug 28 2022 12:00:00"));
    }
    {
        const reference = new ReferenceWithTimezone(new Date("Tue, Aug 2 2022 12:00:00"));
        const output = createParsingComponentsAtWeekday(reference, Weekday.MONDAY, "next");
        expect(output.date()).toStrictEqual(new Date("Mon, Aug 8 2022 12:00:00"));
    }
    {
        const reference = new ReferenceWithTimezone(new Date("Tue, Aug 2 2022 12:00:00"));
        const output = createParsingComponentsAtWeekday(reference, Weekday.FRIDAY, "next");
        expect(output.date()).toStrictEqual(new Date("Fri, Aug 12 2022 12:00:00"));
    }

    {
        const reference = new ReferenceWithTimezone(new Date("Tue, Aug 2 2022 12:00:00"));
        const output = createParsingComponentsAtWeekday(reference, Weekday.SUNDAY, "next");
        expect(output.date()).toStrictEqual(new Date("Sun, Aug 14 2022 12:00:00"));
    }
});

test("Test - Closest Weekday Calculation", () => {
    {
        const refDate = new Date("Sat, 20 Aug 2022 12:00:00");
        expect(getDaysToWeekday(refDate, Weekday.MONDAY)).toBe(2);
    }
    {
        const refDate = new Date("Sat, 20 Aug 2022 12:00:00");
        expect(getDaysToWeekday(refDate, Weekday.TUESDAY)).toBe(3);
    }
    {
        const refDate = new Date("Sat, 20 Aug 2022 12:00:00");
        expect(getDaysToWeekday(refDate, Weekday.FRIDAY)).toBe(-1);
    }
    {
        const refDate = new Date("Sat, 20 Aug 2022 12:00:00");
        expect(getDaysToWeekday(refDate, Weekday.THURSDAY)).toBe(-2);
    }
    {
        const refDate = new Date("Sat, 20 Aug 2022 12:00:00");
        expect(getDaysToWeekday(refDate, Weekday.WEDNESDAY)).toBe(-3);
    }
});
