import * as chrono from '../../src';
import {testSingleCase} from '../test_util';

test("Test - Single Expression", () => {

    testSingleCase(chrono, 'this week', new Date(2017, 11-1, 19), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2017);
        expect(result.start.get('month')).toBe(11);
        expect(result.start.get('day')).toBe(19);
        expect(result.start.get('hour')).toBe(12);
    });

    testSingleCase(chrono, 'this month', new Date(2017, 11-1, 19), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2017);
        expect(result.start.get('month')).toBe(11);
        expect(result.start.get('day')).toBe(1);
        expect(result.start.get('hour')).toBe(12);
    });

    testSingleCase(chrono, 'this month', new Date(2017, 11-1, 1), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2017);
        expect(result.start.get('month')).toBe(11);
        expect(result.start.get('day')).toBe(1);
        expect(result.start.get('hour')).toBe(12);
    });

    testSingleCase(chrono, 'this year', new Date(2017, 11-1, 19), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2017);
        expect(result.start.get('month')).toBe(1);
        expect(result.start.get('day')).toBe(1);
        expect(result.start.get('hour')).toBe(12);
    });


    testSingleCase(chrono, 'next week', new Date(2016, 10-1, 1), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(10);
        expect(result.start.get('day')).toBe(8);
        expect(result.start.get('hour')).toBe(12);
    });

    testSingleCase(chrono, 'next 2 weeks', new Date(2016, 10-1, 1), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(10);
        expect(result.start.get('day')).toBe(15);
        expect(result.start.get('hour')).toBe(12);
    });

    testSingleCase(chrono, 'last week', new Date(2016, 10-1, 1), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(9);
        expect(result.start.get('day')).toBe(24);
        expect(result.start.get('hour')).toBe(12);
    });

    testSingleCase(chrono, 'last 2 weeks', new Date(2016, 10-1, 1), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(9);
        expect(result.start.get('day')).toBe(17);
        expect(result.start.get('hour')).toBe(12);
    });

    testSingleCase(chrono, 'last two weeks', new Date(2016, 10-1, 1), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(9);
        expect(result.start.get('day')).toBe(17);
        expect(result.start.get('hour')).toBe(12);
    });

    testSingleCase(chrono, 'next day', new Date(2016, 10-1, 1), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(10);
        expect(result.start.get('day')).toBe(2);
        expect(result.start.get('hour')).toBe(12);
    });

    testSingleCase(chrono, 'next 2 days', new Date(2016, 10-1, 1), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(10);
        expect(result.start.get('day')).toBe(3);
        expect(result.start.get('hour')).toBe(12);
    });

    testSingleCase(chrono, 'last day', new Date(2016, 10-1, 1), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(9);
        expect(result.start.get('day')).toBe(30);
        expect(result.start.get('hour')).toBe(12);
    });

    testSingleCase(chrono, 'last 2 days', new Date(2016, 10-1, 1), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(9);
        expect(result.start.get('day')).toBe(29);
        expect(result.start.get('hour')).toBe(12);
    });

    testSingleCase(chrono, 'next month', new Date(2016, 10-1, 1), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(11);
        expect(result.start.get('day')).toBe(1);
        expect(result.start.get('hour')).toBe(12);
    });

    testSingleCase(chrono, 'next 2 months', new Date(2016, 10-1, 1), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(12);
        expect(result.start.get('day')).toBe(1);
        expect(result.start.get('hour')).toBe(12);
    });

    testSingleCase(chrono, 'last month', new Date(2016, 10-1, 1), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(9);
        expect(result.start.get('day')).toBe(1);
        expect(result.start.get('hour')).toBe(12);
    });

    testSingleCase(chrono, 'last 2 months', new Date(2016, 10-1, 1), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(1);
        expect(result.start.get('hour')).toBe(12);
    });

    testSingleCase(chrono, 'next few weeks', new Date(2016, 10-1, 1), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(10);
        expect(result.start.get('day')).toBe(22);
        expect(result.start.get('hour')).toBe(12);
    });

    testSingleCase(chrono, 'next four weeks', new Date(2016, 10-1, 1), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(10);
        expect(result.start.get('day')).toBe(29);
        expect(result.start.get('hour')).toBe(12);
    });

    testSingleCase(chrono, 'past week', new Date(2016, 10-1, 1), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(9);
        expect(result.start.get('day')).toBe(24);
        expect(result.start.get('hour')).toBe(12);
    });
});
