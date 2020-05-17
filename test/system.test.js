import * as chrono from '../src/';
import {testSingleCase, testWithExpectedDate} from "./test_util";

//-------------------------------------

test("Test - Load modules", function() {

	expect(chrono).toBeDefined();

	expect(chrono.Chrono).toBeDefined();

	expect(chrono.parse).toBeDefined();

	expect(chrono.parseDate).toBeDefined();

	expect(chrono.casual).toBeDefined();

	expect(chrono.strict).toBeDefined();
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

test("Test - Add custom parser", () => {
	const customParser = {
		pattern: () => { return /(\d{1,2})(st|nd|rd|th)/i },
		extract: (context, match) => {
			return {
				day: parseInt(match[1])
			}
		}
	};

	const custom = new chrono.Chrono();
	custom.parsers.push(customParser);

	const text = "meeting on 25th";
	const results = custom.parse(text, new Date(2017,11 -1, 19));
	expect(results.length).toBe(1)

	const result = results[0]
	expect(result.text).toBe('25th');
	expect(result.start.get('month')).toBe(11);
	expect(result.start.get('day')).toBe(25);
});


test("Test - Compare with native js", function() {

	const testByCompareWithNative = (text) => {
		const expectedDate = new Date(text);
		testWithExpectedDate(chrono, text, expectedDate)
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
});


