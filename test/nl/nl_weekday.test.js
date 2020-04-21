import * as chrono from '../../src/chrono';
import { testSingleCase } from '../test_util';

test("Test - Single Expression", function () {

    testSingleCase(chrono.nl, 'Maandag', new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('Maandag');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(6);
        expect(result.start.get('weekday')).toBe(1);


        expect(result.start.isCertain('day')).toBe(false);
        expect(result.start.isCertain('month')).toBe(false);
        expect(result.start.isCertain('year')).toBe(false);
        expect(result.start.isCertain('weekday')).toBe(true);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 6, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });

    testSingleCase(chrono.nl, 'Maandag (forward dates only)', new Date(2012, 7, 9), {forwardDate: true}, (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('Maandag');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(13);
        expect(result.start.get('weekday')).toBe(1);


        expect(result.start.isCertain('day')).toBe(false);
        expect(result.start.isCertain('month')).toBe(false);
        expect(result.start.isCertain('year')).toBe(false);
        expect(result.start.isCertain('weekday')).toBe(true);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 13, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });

    testSingleCase(chrono.nl, 'Donderdag', new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('Donderdag');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(9);
        expect(result.start.get('weekday')).toBe(4);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 9, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });

    testSingleCase(chrono.nl, 'Zondag', new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('Zondag');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(12);
        expect(result.start.get('weekday')).toBe(0);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 12, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });


    testSingleCase(chrono.nl, 'De deadline is afgelopen vrijdag...', new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(15);
        expect(result.text).toBe('afgelopen vrijdag');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(3);
        expect(result.start.get('weekday')).toBe(5);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 3, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });

    testSingleCase(chrono.nl, 'The deadline is vorige vrijdag...', new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(16);
        expect(result.text).toBe('vorige vrijdag');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(3);
        expect(result.start.get('weekday')).toBe(5);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 3, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });


    testSingleCase(chrono.nl, 'Laten we volgende week vrijdag afspreken', new Date(2015, 3, 18), (result) => {
        expect(result.index).toBe(9);
        expect(result.text).toBe('volgende week vrijdag');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2015);
        expect(result.start.get('month')).toBe(4);
        expect(result.start.get('day')).toBe(24);
        expect(result.start.get('weekday')).toBe(5);

        var resultDate = result.start.date();
        var expectDate = new Date(2015, 3, 24, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });


    testSingleCase(chrono.nl, 'Ik ben van plan om volgende week dinsdag vrij te nemen', new Date(2015, 3, 18), (result) => {
        expect(result.index).toBe(19);
        expect(result.text).toBe('volgende week dinsdag');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2015);
        expect(result.start.get('month')).toBe(4);
        expect(result.start.get('day')).toBe(21);
        expect(result.start.get('weekday')).toBe(2);

        var resultDate = result.start.date();
        var expectDate = new Date(2015, 3, 21, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });
});

test("Test - Weekday With Casual Time", function () {
    testSingleCase(chrono.nl, 'Laten we dinsdag ochtend afspreken', new Date(2015, 3, 18), (result) => {
        expect(result.index).toBe(9);
        expect(result.text).toBe('dinsdag ochtend');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2015);
        expect(result.start.get('month')).toBe(4);
        expect(result.start.get('day')).toBe(21);
        expect(result.start.get('weekday')).toBe(2);
        expect(result.start.get('hour')).toBe(9);

        var resultDate = result.start.date();
        var expectDate = new Date(2015, 3, 21, 9);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });
});

test("Test - Weekday Overlap", function () {

    testSingleCase(chrono.nl, 'Zondag 7 december 2014', new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('Zondag 7 december 2014');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2014);
        expect(result.start.get('month')).toBe(12);
        expect(result.start.get('day')).toBe(7);
        expect(result.start.get('weekday')).toBe(0);


        expect(result.start.isCertain('day')).toBe(true);
        expect(result.start.isCertain('month')).toBe(true);
        expect(result.start.isCertain('year')).toBe(true);
        expect(result.start.isCertain('weekday')).toBe(true);

        var resultDate = result.start.date();
        var expectDate = new Date(2014, 12 - 1, 7, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });


    testSingleCase(chrono.nl, 'Zondag 7/12/2014', new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('Zondag 7/12/2014');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2014);
        expect(result.start.get('month')).toBe(12);
        expect(result.start.get('day')).toBe(7);
        expect(result.start.get('weekday')).toBe(0);


        expect(result.start.isCertain('day')).toBe(true);
        expect(result.start.isCertain('month')).toBe(true);
        expect(result.start.isCertain('year')).toBe(true);
        expect(result.start.isCertain('weekday')).toBe(true);

        var resultDate = result.start.date();
        var expectDate = new Date(2014, 12 - 1, 7, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });
});


test('Test - forward dates only option', function () {

    testSingleCase(chrono.nl, 'komende vrijdag tot maandag', new Date(2016, 8-1, 4), {forwardDate: true}, (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('komende vrijdag tot maandag');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(5);
        expect(result.start.get('weekday')).toBe(5);

        expect(result.start.isCertain('day')).toBe(false);
        expect(result.start.isCertain('month')).toBe(false);
        expect(result.start.isCertain('year')).toBe(false);
        expect(result.start.isCertain('weekday')).toBe(true);

        var resultDate = result.start.date();
        var expectDate = new Date(2016, 8-1, 5, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())


        expect(result.end).not.toBeNull();
        expect(result.end.get('year')).toBe(2016);
        expect(result.end.get('month')).toBe(8);
        expect(result.end.get('day')).toBe(8);
        expect(result.end.get('weekday')).toBe(1);

        expect(result.end.isCertain('day')).toBe(false);
        expect(result.end.isCertain('month')).toBe(false);
        expect(result.end.isCertain('year')).toBe(false);
        expect(result.end.isCertain('weekday')).toBe(true);

        var resultDate = result.end.date();
        var expectDate = new Date(2016, 8-1, 8, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });
});
