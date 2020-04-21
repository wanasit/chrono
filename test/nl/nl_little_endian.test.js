import * as chrono from '../../src/chrono';
import { testSingleCase } from '../test_util';

test("Test - Single expression", function() {

    testSingleCase(chrono, '10 augustus 2012\n', new Date(2012,7,10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe('10 augustus 2012');

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });

    testSingleCase(chrono, '3 februari 82', new Date(2012,7,10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(1982);
        expect(result.start.get('month')).toBe(2);
        expect(result.start.get('day')).toBe(3);

        expect(result.index).toBe(0);
        expect(result.text).toBe('3 februari 82');

        expect(result.start).toBeDate(new Date(1982, 2-1, 3, 12));
    });

    testSingleCase(chrono, '10 augustus 2555 BE', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('10 augustus 2555 BE');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });

    testSingleCase(chrono, '10 augustus 234 v.Chr.', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('10 augustus 234 v.Chr.');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(-234);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        var resultDate = result.start.date();
        var expectDate = new Date(-234, 8-1, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });

    testSingleCase(chrono, '10 augustus 88 n.Chr.', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('10 augustus 88 n.Chr.');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(88);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        var resultDate = result.start.date();
        var expectDate = new Date(88, 8-1, 10, 12);
        expectDate.setFullYear(88);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });

    testSingleCase(chrono, 'Sun 15Sep', new Date(2013,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('Sun 15Sep');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2013);
        expect(result.start.get('month')).toBe(9);
        expect(result.start.get('day')).toBe(15);

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 9-1, 15, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });

    testSingleCase(chrono, 'zondag 15 sept', new Date(2013,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('zondag 15 sept');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2013);
        expect(result.start.get('month')).toBe(9);
        expect(result.start.get('day')).toBe(15);

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 9-1, 15, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });

    testSingleCase(chrono, 'De deadline is 10 augustus', new Date(2012,7,10), (result) => {

        expect(result.index).toBe(15);
        expect(result.text).toBe('10 augustus');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });


    testSingleCase(chrono, 'De deadline is dinsdag 10 januari', new Date(2012,7,10), (result) => {

        expect(result.index).toBe(15);
        expect(result.text).toBe('dinsdag 10 januari');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2013);
        expect(result.start.get('month')).toBe(1);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('weekday')).toBe(2);

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 1-1, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });


    testSingleCase(chrono, 'De deadline is di, 10 januari', new Date(2012,7,10), (result) => {

        expect(result.index).toBe(15);
        expect(result.text).toBe('di, 10 januari');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2013);
        expect(result.start.get('month')).toBe(1);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('weekday')).toBe(2);

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 1-1, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });


    testSingleCase(chrono, 'Op 31 maart, 2016', new Date(2012,7,10), (result) => {

        expect(result.index).toBe(0);
        expect(result.text).toBe('Op 31 maart, 2016');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(3);
        expect(result.start.get('day')).toBe(31);

        var resultDate = result.start.date();
        var expectDate = new Date(2016, 3-1, 31, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });


    testSingleCase(chrono, '23 februari 2016', new Date(2012,7,10), (result) => {

        expect(result.index).toBe(0);
        expect(result.text).toBe('23 februari 2016');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(2);
        expect(result.start.get('day')).toBe(23);

        var resultDate = result.start.date();
        var expectDate = new Date(2016, 2-1, 23, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });
});

test("Test - Single expression with separators", function() {

    var text = "10-augustus 2012";
    var expectDate = new Date(2012, 8-1, 10, 12, 0);
    var result = chrono.parse(text, new Date(2012,7, 8))[0];
    console.log('result',result)
    expect(result.text).toBe('10-augustus 2012');
    expect(expectDate.getTime()).toBeCloseTo(result.start.date().getTime());


    var text = "10-aug-2012";
    var expectDate = new Date(2012, 8-1, 10, 12, 0);
    var result = chrono.parse(text, new Date(2012,7, 8))[0];
    expect(result.text).toBe('10-aug-2012');
    expect(expectDate.getTime()).toBeCloseTo(result.start.date().getTime());

    var text = "10/augustus 2012";
    var expectDate = new Date(2012, 8-1, 10, 12, 0);
    var result = chrono.parse(text, new Date(2012,7, 8))[0];
    expect(result.text).toBe('10/augustus 2012');
    expect(expectDate.getTime()).toBeCloseTo(result.start.date().getTime());


    var text = "10/aug/2012";
    var expectDate = new Date(2012, 8-1, 10, 12, 0);
    var result = chrono.parse(text, new Date(2012,7, 8))[0];
    expect(result.text).toBe('10/aug/2012');
    expect(expectDate.getTime()).toBeCloseTo(result.start.date().getTime());
});

test("Test - Range expression", function() {

    testSingleCase(chrono, '10 - 22 augustus 2012', new Date(2012,7,10), (result) => {

        expect(result.index).toBe(0);
        expect(result.text).toBe('10 - 22 augustus 2012');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());


        expect(result.end).not.toBeNull();
        expect(result.end.get('year')).toBe(2012);
        expect(result.end.get('month')).toBe(8);
        expect(result.end.get('day')).toBe(22);

        var resultDate = result.end.date();
        var expectDate = new Date(2012, 8-1, 22, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });


    testSingleCase(chrono, '10 tot 22 augustus 2012', new Date(2012,7,10), (result) => {

        expect(result.index).toBe(0);
        expect(result.text).toBe('10 tot 22 augustus 2012');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());


        expect(result.end).not.toBeNull();
        expect(result.end.get('year')).toBe(2012);
        expect(result.end.get('month')).toBe(8);
        expect(result.end.get('day')).toBe(22);

        var resultDate = result.end.date();
        var expectDate = new Date(2012, 8-1, 22, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });

    testSingleCase(chrono, '10 augustus - 12 september', new Date(2012,7,10), (result) => {

        expect(result.index).toBe(0);
        expect(result.text).toBe('10 augustus - 12 september');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());


        expect(result.end).not.toBeNull();
        expect(result.end.get('year')).toBe(2012);
        expect(result.end.get('month')).toBe(9);
        expect(result.end.get('day')).toBe(12);

        var resultDate = result.end.date();
        var expectDate = new Date(2012, 9-1, 12, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });

    testSingleCase(chrono, '10 augustus - 12 september 2013', new Date(2012,7,10), (result) => {

        expect(result.index).toBe(0);
        expect(result.text).toBe('10 augustus - 12 september 2013');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2013);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 8-1, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());


        expect(result.end).not.toBeNull();
        expect(result.end.get('year')).toBe(2013);
        expect(result.end.get('month')).toBe(9);
        expect(result.end.get('day')).toBe(12);

        var resultDate = result.end.date();
        var expectDate = new Date(2013, 9-1, 12, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });
});


test("Test - Combined expression", function() {

    testSingleCase(chrono, '12 juli om 19:00', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('12 juli om 19:00');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(7);
        expect(result.start.get('day')).toBe(12);


        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7-1, 12, 19, 0);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });


    testSingleCase(chrono, '5 mei 12:00', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('5 mei 12:00');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(5);
        expect(result.start.get('day')).toBe(5);


        var resultDate = result.start.date();
        var expectDate = new Date(2012, 5-1, 5, 12, 0);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });


    testSingleCase(chrono, '7 mei 11:00', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('7 mei 11:00');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(5);
        expect(result.start.get('day')).toBe(7);
        expect(result.start.get('hour')).toBe(11);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 5-1, 7, 11, 0);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });
});

test("Test - little endian date followed by time", function() {


    testSingleCase(chrono, '24 oktober, 9 uur \'s ochtends', new Date(2017, 7-1, 7, 15), (result) => {
        expect(result.text).toBe('24 oktober, 9 uur \'s ochtends');
        expect(result.start.get('day')).toBe(24);
        expect(result.start.get('month')).toBe(10);
        expect(result.start.get('hour')).toBe(9);
    });

    testSingleCase(chrono, '24 oktober, 9 uur \'s avonds', new Date(2017, 7-1, 7, 15), (result) => {
        expect(result.text).toBe('24 oktober, 9 uur \'s avonds');
        expect(result.start.get('day')).toBe(24);
        expect(result.start.get('month')).toBe(10);
        expect(result.start.get('hour')).toBe(21);
    });

    testSingleCase(chrono, '24 oktober, 09:00 uur', new Date(2017, 7-1, 7, 15), (result) => {
        expect(result.text).toBe('24 oktober, 09:00 uur');
        expect(result.start.get('day')).toBe(24);
        expect(result.start.get('month')).toBe(10);
        expect(result.start.get('hour')).toBe(9);
    });

    testSingleCase(chrono, '24 oktober, 21:00 uur.', new Date(2017, 7-1, 7, 15), (result) => {
        expect(result.text).toBe('24 oktober, 21:00 uur');
        expect(result.start.get('day')).toBe(24);
        expect(result.start.get('month')).toBe(10);
        expect(result.start.get('hour')).toBe(21);
    });

    testSingleCase(chrono, '24 oktober 10 uur', new Date(2017, 7-1, 7, 15), (result) => {
        expect(result.text).toBe('24 oktober 10 uur');
        expect(result.start.get('day')).toBe(24);
        expect(result.start.get('month')).toBe(10);
        expect(result.start.get('hour')).toBe(10);
    });
});

test("Test - little endian date prefixed by arbitrary numbers", function() {
    testSingleCase(chrono.nl, '20 \n 3 maart 2020', new Date(2017, 7-1, 7, 15), (result) => {
        expect(result.text).toBe('3 maart 2020');
        expect(result.start.get('day')).toBe(3);
        expect(result.start.get('month')).toBe(3);
        expect(result.start.get('year')).toBe(2020);
    });
});

test("Test - Impossible Dates (Strict Mode)", function() {

    var text = "32 augustus 2014";
    var results = chrono.strict.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(0);

    var text = "29 februari 2014";
    var results = chrono.strict.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(0);

    var text = "32 augustus";
    var results = chrono.strict.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(0);

    var text = "29 februari";
    var results = chrono.strict.parse(text, new Date(2013,7,10));
    expect(results.length).toBe(0)

});

test("Test - Impossible Dates (Casual Mode)", function() {

    var text = "32 augustus 2015";
    var expectDate = new Date(2015, 8, 1, 12, 0);
    var results = chrono.parse(text);
    var resultDate = results[0].start.date();
    expect(results.length).toBe(1);
    expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
});

