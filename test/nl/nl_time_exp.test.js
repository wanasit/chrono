import * as chrono from '../../src/chrono';
import { testSingleCase } from '../test_util';

test("Test - Single Expression", function() {


    testSingleCase(chrono.nl, '18:10', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0)
        expect(result.text).toBe('18:10')

        expect(result.start).not.toBeNull()
        expect(result.start.get('hour')).toBe(18)
        expect(result.start.get('minute')).toBe(10)


        expect(result.start.isCertain('day')).toBe(false)
        expect(result.start.isCertain('month')).toBe(false)
        expect(result.start.isCertain('year')).toBe(false)
        expect(result.start.isCertain('hour')).toBe(true)
        expect(result.start.isCertain('minute')).toBe(true)
        expect(result.start.isCertain('second')).toBe(false)
        expect(result.start.isCertain('millisecond')).toBe(false)

        expect(result.start).toBeDate(new Date(2012, 7, 10, 18, 10));
    });

});

test("Test - Range Expression", function() {

    testSingleCase(chrono.nl, '18:10 - 22.32', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0)
        expect(result.text).toBe('18:10 - 22.32')

        expect(result.start).not.toBeNull()
        expect(result.start.get('hour')).toBe(18)
        expect(result.start.get('minute')).toBe(10)

        expect(result.start.isCertain('day')).toBe(false)
        expect(result.start.isCertain('month')).toBe(false)
        expect(result.start.isCertain('year')).toBe(false)
        expect(result.start.isCertain('hour')).toBe(true)
        expect(result.start.isCertain('minute')).toBe(true)
        expect(result.start.isCertain('second')).toBe(false)
        expect(result.start.isCertain('millisecond')).toBe(false)

        expect(result.start).toBeDate(new Date(2012, 7, 10, 18, 10));

        expect(result.end).not.toBeNull()
        expect(result.end.get('hour')).toBe(22)
        expect(result.end.get('minute')).toBe(32)

        expect(result.end.isCertain('day')).toBe(false)
        expect(result.end.isCertain('month')).toBe(false)
        expect(result.end.isCertain('year')).toBe(false)
        expect(result.end.isCertain('hour')).toBe(true)
        expect(result.end.isCertain('minute')).toBe(true)
        expect(result.end.isCertain('second')).toBe(false)
        expect(result.end.isCertain('millisecond')).toBe(false)

        expect(result.end).toBeDate(new Date(2012, 7, 10, 22, 32));
    });

    testSingleCase(chrono.nl, ' van 6:30 tot 23:00 ', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe('van 6:30 tot 23:00');

        expect(result.start).not.toBeNull();
        expect(result.start.get('hour')).toBe(6);
        expect(result.start.get('minute')).toBe(30);
        expect(result.start.get('meridiem')).toBe(0);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 6, 30));

        expect(result.end).not.toBeNull();
        expect(result.end.get('hour')).toBe(23);
        expect(result.end.get('minute')).toBe(0);
        expect(result.end.get('meridiem')).toBe(1);

        expect(result.end).toBeDate(new Date(2012, 7, 10, 23, 0));
    });

});

test("Test - Random date + time expression", function() {

    var text = "om 12";
    var result = chrono.nl.parse(text)[0];
    expect(result.text).toBe(text)

    var text = "tussen de middag";
    var result = chrono.nl.parse(text)[0];
    expect(result.text).toBe(text);
    expect(result.start.get('hour')).toBe(12);

    var text = "middernacht";
    var result = chrono.nl.parse(text)[0];
    expect(result.text).toBe(text);
    expect(result.start.get('hour')).toBe(0);

    var text = "9 uur 's ochtends";
    var result = chrono.nl.parse(text)[0];
    expect(result.text).toBe(text);
    expect(result.start.get('hour')).toBe(9);

    var text = "4 uur 's middags";
    var result = chrono.nl.parse(text)[0];
    expect(result.text).toBe(text);
    expect(result.start.get('hour')).toBe(16);

});
