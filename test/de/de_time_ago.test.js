import * as chrono from '../../src/chrono';
import { testSingleCase, testUnexpectedResult } from '../test_util';

test("Test - Single Expression", function() {

    testSingleCase(chrono.de, 'Wir unternahmen etwas vor 5 Tagen', new Date(2012,7,10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(5);

        expect(result.index).toBe(22);
        expect(result.text).toBe('vor 5 Tagen');

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 5, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });

    testSingleCase(chrono.de, 'Vor 10 Tagen unternahmen wir etwas', new Date(2012,7,10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(7);
        expect(result.start.get('day')).toBe(31);

        expect(result.index).toBe(0);
        expect(result.text).toBe('Vor 10 Tagen');

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7-1, 31, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });


    testSingleCase(chrono.de, 'vor 15 minuten', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('vor 15 minuten');
        expect(result.start.get('hour')).toBe(11);
        expect(result.start.get('minute')).toBe(59);

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,11,59);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });

    testSingleCase(chrono.de, '   vor 12 Stunden', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe('vor 12 Stunden');
        expect(result.start.get('hour')).toBe(0);
        expect(result.start.get('minute')).toBe(14);

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,0,14);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });

    testSingleCase(chrono.de, '   vor einer halben Stunde', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe('vor einer halben Stunde');
        expect(result.start.get('hour')).toBe(11);
        expect(result.start.get('minute')).toBe(44);

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,11,44);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });


    testSingleCase(chrono.de, 'Vor 12 Stunden tat ich etwas', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('Vor 12 Stunden');
        expect(result.start.get('hour')).toBe(0);
        expect(result.start.get('minute')).toBe(14);

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,0,14);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });


    testSingleCase(chrono.de, 'Vor 12 Sekunden tat ich etwas', new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('Vor 12 Sekunden');
        expect(result.start.get('hour')).toBe(12);
        expect(result.start.get('minute')).toBe(13);
        expect(result.start.get('second')).toBe(48);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 12, 13, 48);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });


    testSingleCase(chrono.de, 'Vor drei Sekunden trank ich Tee', new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('Vor drei Sekunden');
        expect(result.start.get('hour')).toBe(12);
        expect(result.start.get('minute')).toBe(13);
        expect(result.start.get('second')).toBe(57);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 12, 13, 57);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });



    testSingleCase(chrono.de, 'Vor 5 tagen taten wir etwas', new Date(2012,7,10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(5);

        expect(result.index).toBe(0);
        expect(result.text).toBe('Vor 5 tagen');

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 5, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });


    testSingleCase(chrono.de, '   vor Einer halben stunde', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe('vor Einer halben stunde');
        expect(result.start.get('hour')).toBe(11);
        expect(result.start.get('minute')).toBe(44);

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,11,44);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });


    testSingleCase(chrono.de, 'Vor einer tag, wir taten', new Date(2012,7,10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(9);

        expect(result.index).toBe(0);
        expect(result.text).toBe('Vor einer tag');

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 9, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });


    testSingleCase(chrono.de, 'vor einer min', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('vor einer min');
        expect(result.start.get('hour')).toBe(12);
        expect(result.start.get('minute')).toBe(13);

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,12,13);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });

});


test("Test - Single Expression (Casual)", function() {

    testSingleCase(chrono.de, 'Vor 5 Monaten unternahmen wir etwas', new Date(2012, 8-1,10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(3);
        expect(result.start.get('day')).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe('Vor 5 Monaten');

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 3-1, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });

    testSingleCase(chrono.de, 'Vor 5 Jahren unternahmen wir etwas', new Date(2012, 8-1,10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2007);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe('Vor 5 Jahren');

        var resultDate = result.start.date();
        var expectDate = new Date(2007, 8-1, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });


    testSingleCase(chrono.de, 'vor einer Woche aßen wir Pizza', new Date(2012, 8-1, 3), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(7);
        expect(result.start.get('day')).toBe(27);

        expect(result.index).toBe(0);
        expect(result.text).toBe('vor einer Woche');

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7-1, 27, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });


    testSingleCase(chrono.de, 'vor einigen Tagen aßen wir Pizza', new Date(2012, 8-1, 3), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(7);
        expect(result.start.get('day')).toBe(31);

        expect(result.index).toBe(0);
        expect(result.text).toBe('vor einigen Tagen');

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7-1, 31, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });
});

test("Test - Single Expression (Strict)", function() {

    testUnexpectedResult(chrono.strict, 'vor einer woche taten wir etwas', new Date(2012, 8-1, 3))

    testSingleCase(chrono.de, 'vor einer woche taten wir etwas', new Date(2012, 8-1, 3))
});
