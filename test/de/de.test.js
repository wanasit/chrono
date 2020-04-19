import * as chrono from '../../src/chrono';
import { testSingleCase } from '../test_util';

test('Test - Random text', function() {

    testSingleCase(chrono, '...Donnerstag, 15. Dezember 2011 Best Available Rate ', (result) => {

        expect(result.start.get('day')).toBe(15);
        expect(result.start.get('month')).toBe(12);
        expect(result.start.get('year')).toBe(2011);
    });

    testSingleCase(chrono, '9:00 bis 17:00, Dienstag, 20. Mai 2013', (result) => {

        expect(result.start.get('hour')).toBe(9);
        expect(result.end.get('hour')).toBe(17);
        expect(result.end.get('meridiem')).toBe(1);
        expect(result.end.get('day')).toBe(20);
        expect(result.end.get('month')).toBe(5);
        expect(result.end.get('year')).toBe(2013)
    });
});


test('Test - Formal German support in default setting', function() {

    // German's formal text should be handle by default casual and strict

    const text = "9:00 bis 17:00, Dienstag, 20. Mai 2013";

    {
        const results = chrono.parse(text);
        expect(results.length).toBe(1);
    }

    {
        const results = chrono.strict.parse(text);
        expect(results.length).toBe(1);
    }

    {
        const results = chrono.de.parse(text);
        expect(results.length).toBe(1);
    }
});


test('Test - Not apply German casual keywords in default setting', function() {

    const text = "Do";

    {
        const results = chrono.parse(text);
        expect(results.length).toBe(0);
    }

    {
        const results = chrono.strict.parse(text);
        expect(results.length).toBe(0);
    }

    {
        const results = chrono.de.parse(text);
        expect(results.length).toBe(1);
    }
});
