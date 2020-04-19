import * as chrono from '../../src/chrono';
import { testSingleCase } from '../test_util';

test("Test - Single Expression", function() {


    testSingleCase(chrono.de, '18:10', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('18:10');

        expect(result.start).not.toBeNull();
        expect(result.start.get('hour')).toBe(18);
        expect(result.start.get('minute')).toBe(10);


        expect(result.start.isCertain('day')).toBe(false);
        expect(result.start.isCertain('month')).toBe(false);
        expect(result.start.isCertain('year')).toBe(false);
        expect(result.start.isCertain('hour')).toBe(true);
        expect(result.start.isCertain('minute')).toBe(true);
        expect(result.start.isCertain('second')).toBe(false);
        expect(result.start.isCertain('millisecond')).toBe(false);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 18, 10);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });

});

test("Test - Range Expression", function() {

    testSingleCase(chrono.de, '18:10 - 22.32', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('18:10 - 22.32');

        expect(result.start).not.toBeNull();
        expect(result.start.get('hour')).toBe(18);
        expect(result.start.get('minute')).toBe(10);

        expect(result.start.isCertain('day')).toBe(false);
        expect(result.start.isCertain('month')).toBe(false);
        expect(result.start.isCertain('year')).toBe(false);
        expect(result.start.isCertain('hour')).toBe(true);
        expect(result.start.isCertain('minute')).toBe(true);
        expect(result.start.isCertain('second')).toBe(false);
        expect(result.start.isCertain('millisecond')).toBe(false);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 18, 10);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());

        expect(result.end).not.toBeNull();
        expect(result.end.get('hour')).toBe(22);
        expect(result.end.get('minute')).toBe(32);

        expect(result.end.isCertain('day')).toBe(false);
        expect(result.end.isCertain('month')).toBe(false);
        expect(result.end.isCertain('year')).toBe(false);
        expect(result.end.isCertain('hour')).toBe(true);
        expect(result.end.isCertain('minute')).toBe(true);
        expect(result.end.isCertain('second')).toBe(false);
        expect(result.end.isCertain('millisecond')).toBe(false);

        var resultDate = result.end.date();
        var expectDate = new Date(2012, 7, 10, 22, 32);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });

    testSingleCase(chrono.de, ' von 6:30 bis 23:00 ', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe('von 6:30 bis 23:00');

        expect(result.start).not.toBeNull();
        expect(result.start.get('hour')).toBe(6);
        expect(result.start.get('minute')).toBe(30);
        expect(result.start.get('meridiem')).toBe(0);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 6, 30);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());

        expect(result.end).not.toBeNull();
        expect(result.end.get('hour')).toBe(23);
        expect(result.end.get('minute')).toBe(0);
        expect(result.end.get('meridiem')).toBe(1);

        var resultDate = result.end.date();
        var expectDate = new Date(2012, 7, 10, 23, 0);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });

});


test("Test - Timezone extraction", function() {

    var text = "Freitag um 14 Uhr";
    var result = chrono.de.parse(text, new Date(2016, 3, 28))[0];
    expect(result.text).toBe(text);
    expect(result.start.isCertain('timezoneOffset')).toBe(false);
    expect(!result.start.get('timezoneOffset')).not.toBeNull();


    var text = "Freitag um 14 Uhr CET";
    var result = chrono.de.parse(text, new Date(2016, 3, 28))[0];
    expect(result.text).toBe(text);
    expect(result.start.isCertain('timezoneOffset')).toBe(true);
    expect(result.start.get('timezoneOffset')).toBe(60);


    var text = "am Freitag um 14 Uhr cet";
    var result = chrono.de.parse(text, new Date(2016, 3, 28))[0];
    expect(result.text).toBe(text);
    expect(result.start.isCertain('timezoneOffset')).toBe(true);
    expect(result.start.get('timezoneOffset')).toBe(60);


    var text = "am Freitag um 14 Uhr cetteln wir etwas an";
    var result = chrono.de.parse(text, new Date(2016, 3, 28))[0];
    expect(result.text).toBe('am Freitag um 14 Uhr');
    expect(result.start.isCertain('timezoneOffset')).toBe(false);
    expect(!result.start.get('timezoneOffset')).not.toBeNull()
});


test("Test - Random date + time expression", function() {

    var text = "um 12";
    var result = chrono.de.parse(text)[0];
    expect(result.text).toBe(text);

    var text = "am Mittag";
    var result = chrono.de.parse(text)[0];
    expect(result.text).toBe('Mittag');
    expect(result.start.get('hour')).toBe(12);

    var text = "mittags";
    var result = chrono.de.parse(text)[0];
    expect(result.text).toBe(text);
    expect(result.start.get('hour')).toBe(12);

    var text = "um Mitternacht";
    var result = chrono.de.parse(text)[0];
    expect(result.text).toBe(text);
    expect(result.start.get('hour')).toBe(0);

    var text = "mitternachts";
    var result = chrono.de.parse(text)[0];
    expect(result.text).toBe(text);
    expect(result.start.get('hour')).toBe(0);
});
