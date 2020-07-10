import * as chrono from '../src/';
import {testSingleCase} from "./test_util";
import {Meridiem} from "../src";

//-------------------------------------

test("Test - Load modules", function() {

	expect(chrono).toBeDefined();

	expect(chrono.Chrono).toBeDefined();

	expect(chrono.parse).toBeDefined();

	expect(chrono.parseDate).toBeDefined();

	expect(chrono.casual).toBeDefined();

	expect(chrono.strict).toBeDefined();
});

test("Test - Basic parse date functions", function() {

	expect(chrono.parseDate("7:00PM July 5th, 2020"))
		.toStrictEqual(new Date(2020, 7-1, 5, 19))

	expect(chrono.en.parseDate("7:00PM July 5th, 2020"))
		.toStrictEqual(new Date(2020, 7-1, 5, 19))

	expect(chrono.strict.parseDate("7:00PM July 5th, 2020"))
		.toStrictEqual(new Date(2020, 7-1, 5, 19))

	expect(chrono.casual.parseDate("7:00PM July 5th, 2020"))
		.toStrictEqual(new Date(2020, 7-1, 5, 19))
});

test("Test - Add custom parser", () => {
    const customParser = {
		pattern: () => { return /(\d{1,2})(st|nd|rd|th)/i },
		extract: (context, match) => {

			expect(match[0]).toBe('25th')
			expect(context.refDate).toBeTruthy()

			return {
				day: parseInt(match[1])
			}
		}
	};

    const custom = new chrono.Chrono();
    custom.parsers.push(customParser);
	testSingleCase(custom, 'meeting on 25th', new Date(2017,11 -1, 19), (result) => {

		expect(result.text).toBe('25th');
		expect(result.start.get('month')).toBe(11);
		expect(result.start.get('day')).toBe(25);
	});
});

test("Test - Add custom parser example", () => {

	const custom = chrono.casual.clone();
	custom.parsers.push({
		pattern: () => { return /\bChristmas\b/i },
		extract: () => {
			return {
				day: 25, month: 12
			}
		}
	});

	testSingleCase(custom, "I'll arrive at 2.30AM on Christmas", (result) => {
		expect(result.text).toBe('at 2.30AM on Christmas');
		expect(result.start.get('month')).toBe(12);
		expect(result.start.get('day')).toBe(25);
		expect(result.start.get('hour')).toBe(2);
		expect(result.start.get('minute')).toBe(30);
	})

	testSingleCase(custom, "I'll arrive at Christmas night", (result) => {
		expect(result.text).toBe('Christmas night');
		expect(result.start.get('month')).toBe(12);
		expect(result.start.get('day')).toBe(25);
		expect(result.start.get('meridiem')).toBe(Meridiem.PM);
		expect(result.start.get('meridiem')).toBe(1);
	})

	testSingleCase(custom, "Doing something tomorrow", (result) => {
		expect(result.text).toBe('tomorrow');
	})
});

test("Test - Add custom refiner example", () => {

	const custom = chrono.casual.clone();
	custom.refiners.push({
		refine: (context, results) => {
			// If there is no AM/PM (meridiem) specified,
			//  let all time between 1:00 - 4:00 be PM (13.00 - 16.00)
			results.forEach((result) => {
				if (!result.start.isCertain('meridiem') &&
					result.start.get('hour') >= 1 && result.start.get('hour') < 4) {

					result.start.assign('meridiem', Meridiem.PM);
					result.start.assign('hour', result.start.get('hour') + 12);
				}
			});
			return results;
		}
	});

	testSingleCase(custom, 'This is at 2.30', (result) => {
		expect(result.text).toBe('at 2.30');
		expect(result.start.get('hour')).toBe(14);
		expect(result.start.get('minute')).toBe(30);
	})

	testSingleCase(custom, 'This is at 2.30 AM', (result) => {
		expect(result.text).toBe('at 2.30 AM');
		expect(result.start.get('hour')).toBe(2);
		expect(result.start.get('minute')).toBe(30);
	})
});

test("Test - Compare with native js", ()=> {

	const testByCompareWithNative = (text) => {
		const expectedDate = new Date(text);
		testSingleCase(chrono, text, (result) => {
			expect(result.text).toBe(text);
			expect(result).toBeDate(expectedDate);
		})
	};

	testByCompareWithNative('1994-11-05T13:15:30Z');

	testByCompareWithNative('1994-02-28T08:15:30-05:30');

	testByCompareWithNative('1994-11-05T08:15:30-05:30');

	testByCompareWithNative('1994-11-05T08:15:30+11:30');

	testByCompareWithNative('2014-11-30T08:15:30-05:30');

	testByCompareWithNative('Sat, 21 Feb 2015 11:50:48 -0500');

	testByCompareWithNative('22 Feb 2015 04:12:00 -0000');

	testByCompareWithNative('1900-01-01T00:00:00-01:00');

	testByCompareWithNative('1900-01-01T00:00:00-00:00');

	testByCompareWithNative('9999-12-31T23:59:00-00:00');

	testByCompareWithNative('09/25/2017 10:31:50.522 PM');

	testByCompareWithNative('Sat Nov 05 1994 22:45:30 GMT+0900 (JST)');

	testByCompareWithNative('Fri, 31 Mar 2000 07:00:00 UTC');

	testByCompareWithNative('2014-12-14T18:22:14.759Z');
});

test("Test - Skip version-number-like pattern", () => {

	testSingleCase(chrono, '1.5.3 - 2015-09-24', (result) => {
		expect(result.text).toBe('2015-09-24');
	})

	testSingleCase(chrono, '1.5.30 - 2015-09-24', (result) => {
		expect(result.text).toBe('2015-09-24');
	})

	testSingleCase(chrono, '1.50.30 - 2015-09-24', (result) => {
		expect(result.text).toBe('2015-09-24');
	})
})
