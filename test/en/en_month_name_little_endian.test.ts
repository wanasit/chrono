import * as chrono from '../../src';
import {testSingleCase, testUnexpectedResult} from '../test_util';

test("Test - Single expression", () => {

    testSingleCase(chrono, '10 August 2012', new Date(2012,7,10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe('10 August 2012');

        expect(result.start).toBeDate(new Date(2012, 8-1, 10, 12));
    });

    testSingleCase(chrono, '3rd Feb 82', new Date(2012,7,10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(1982);
        expect(result.start.get('month')).toBe(2);
        expect(result.start.get('day')).toBe(3);

        expect(result.index).toBe(0);
        expect(result.text).toBe('3rd Feb 82');

        expect(result.start).toBeDate(new Date(1982, 2-1, 3, 12));
    });

    testSingleCase(chrono, '10 August 2555 BE', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('10 August 2555 BE');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 8-1, 10, 12));
    });

    testSingleCase(chrono, '10 August 234 BC', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('10 August 234 BC');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(-234);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        expect(result.start).toBeDate(new Date(-234, 8-1, 10, 12));
    });

    testSingleCase(chrono, '10 August 88 AD', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('10 August 88 AD');

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

        expect(result.start).toBeDate(new Date(2013, 9-1, 15, 12));
    });

    testSingleCase(chrono, 'SUN 15SEP', new Date(2013,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('SUN 15SEP');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2013);
        expect(result.start.get('month')).toBe(9);
        expect(result.start.get('day')).toBe(15);

        expect(result.start).toBeDate(new Date(2013, 9-1, 15, 12));
    });

    testSingleCase(chrono, 'The Deadline is 10 August', new Date(2012,7,10), (result) => {

        expect(result.index).toBe(16);
        expect(result.text).toBe('10 August');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 8-1, 10, 12));
    });


    testSingleCase(chrono, 'The Deadline is Tuesday, 10 January', new Date(2012,7,10), (result) => {

        expect(result.index).toBe(16);
        expect(result.text).toBe('Tuesday, 10 January');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2013);
        expect(result.start.get('month')).toBe(1);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('weekday')).toBe(2);

        expect(result.start).toBeDate(new Date(2013, 1-1, 10, 12));
    });


    testSingleCase(chrono, 'The Deadline is Tue, 10 January', new Date(2012,7,10), (result) => {

        expect(result.index).toBe(16);
        expect(result.text).toBe('Tue, 10 January');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2013);
        expect(result.start.get('month')).toBe(1);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('weekday')).toBe(2);

        expect(result.start).toBeDate(new Date(2013, 1-1, 10, 12));
    });


    testSingleCase(chrono, '31st March, 2016', new Date(2012,7,10), (result) => {

        expect(result.index).toBe(0);
        expect(result.text).toBe('31st March, 2016');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(3);
        expect(result.start.get('day')).toBe(31);

        expect(result.start).toBeDate(new Date(2016, 3-1, 31, 12));
    });


    testSingleCase(chrono, '23rd february, 2016', new Date(2012,7,10), (result) => {

        expect(result.index).toBe(0);
        expect(result.text).toBe('23rd february, 2016');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(2);
        expect(result.start.get('day')).toBe(23);

        expect(result.start).toBeDate(new Date(2016, 2-1, 23, 12));
    });
});

test("Test - Single expression with separators", () => {

    testSingleCase(chrono, '10-August 2012', new Date(2012,7, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result).toBeDate(new Date(2012, 8-1, 10, 12, 0));
    });

    testSingleCase(chrono, '10-August-2012', new Date(2012,7, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result).toBeDate(new Date(2012, 8-1, 10, 12, 0));
    });


    testSingleCase(chrono, '10/August 2012', new Date(2012,7, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result).toBeDate(new Date(2012, 8-1, 10, 12, 0));
    });


    testSingleCase(chrono, '10/August/2012', new Date(2012,7, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result).toBeDate(new Date(2012, 8-1, 10, 12, 0));
    });
});

test("Test - Range expression", () => {

    testSingleCase(chrono, '10 - 22 August 2012', new Date(2012,7,10), (result) => {

        expect(result.index).toBe(0);
        expect(result.text).toBe('10 - 22 August 2012');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 8-1, 10, 12));


        expect(result.end).not.toBeNull();
        expect(result.end.get('year')).toBe(2012);
        expect(result.end.get('month')).toBe(8);
        expect(result.end.get('day')).toBe(22);

        expect(result.end).toBeDate(new Date(2012, 8-1, 22, 12));
    });


    testSingleCase(chrono, '10 to 22 August 2012', new Date(2012,7,10), (result) => {

        expect(result.index).toBe(0);
        expect(result.text).toBe('10 to 22 August 2012');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 8-1, 10, 12));


        expect(result.end).not.toBeNull();
        expect(result.end.get('year')).toBe(2012);
        expect(result.end.get('month')).toBe(8);
        expect(result.end.get('day')).toBe(22);

        expect(result.end).toBeDate(new Date(2012, 8-1, 22, 12));
    });

    testSingleCase(chrono, '10 August - 12 September', new Date(2012,7,10), (result) => {

        expect(result.index).toBe(0);
        expect(result.text).toBe('10 August - 12 September');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 8-1, 10, 12));


        expect(result.end).not.toBeNull();
        expect(result.end.get('year')).toBe(2012);
        expect(result.end.get('month')).toBe(9);
        expect(result.end.get('day')).toBe(12);

        expect(result.end).toBeDate(new Date(2012, 9-1, 12, 12));
    });

    testSingleCase(chrono, '10 August - 12 September 2013', new Date(2012,7,10), (result) => {

        expect(result.index).toBe(0);
        expect(result.text).toBe('10 August - 12 September 2013');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2013);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        expect(result.start).toBeDate(new Date(2013, 8-1, 10, 12));


        expect(result.end).not.toBeNull();
        expect(result.end.get('year')).toBe(2013);
        expect(result.end.get('month')).toBe(9);
        expect(result.end.get('day')).toBe(12);

        expect(result.end).toBeDate(new Date(2013, 9-1, 12, 12));
    });
});

test("Test - Combined expression", () => {

    testSingleCase(chrono, '12th of July at 19:00', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('12th of July at 19:00');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(7);
        expect(result.start.get('day')).toBe(12);


        expect(result.start).toBeDate(new Date(2012, 7-1, 12, 19, 0));
    });


    testSingleCase(chrono, '5 May 12:00', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('5 May 12:00');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(5);
        expect(result.start.get('day')).toBe(5);


        expect(result.start).toBeDate(new Date(2012, 5-1, 5, 12, 0));
    });


    testSingleCase(chrono, '7 May 11:00', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('7 May 11:00');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(5);
        expect(result.start.get('day')).toBe(7);
        expect(result.start.get('hour')).toBe(11);

        expect(result.start).toBeDate(new Date(2012, 5-1, 7, 11, 0));
    });
});

test("Test - Ordinal Words", () => {


    testSingleCase(chrono, 'Twenty-fourth of May', new Date(2012,7,10), (result) => {

        expect(result.text).toBe('Twenty-fourth of May');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(5);
        expect(result.start.get('day')).toBe(24);
    });


    testSingleCase(chrono, 'Eighth to eleventh May 2010', new Date(2012,7,10), (result) => {

        expect(result.text).toBe('Eighth to eleventh May 2010');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2010);
        expect(result.start.get('month')).toBe(5);
        expect(result.start.get('day')).toBe(8);

        expect(result.end).not.toBeNull();
        expect(result.end.get('year')).toBe(2010);
        expect(result.end.get('month')).toBe(5);
        expect(result.end.get('day')).toBe(11);
    });

});

test("Test - little endian date followed by time", () => {


    testSingleCase(chrono, '24th October, 9 am', new Date(2017, 7-1, 7, 15), (result) => {
        expect(result.text).toBe('24th October, 9 am');
        expect(result.start.get('day')).toBe(24);
        expect(result.start.get('month')).toBe(10);
        expect(result.start.get('hour')).toBe(9);
    });

    testSingleCase(chrono, '24th October, 9 pm', new Date(2017, 7-1, 7, 15), (result) => {
        expect(result.text).toBe('24th October, 9 pm');
        expect(result.start.get('day')).toBe(24);
        expect(result.start.get('month')).toBe(10);
        expect(result.start.get('hour')).toBe(21);
    });

    testSingleCase(chrono, '24 October, 9 pm', new Date(2017, 7-1, 7, 15), (result) => {
        expect(result.text).toBe('24 October, 9 pm');
        expect(result.start.get('day')).toBe(24);
        expect(result.start.get('month')).toBe(10);
        expect(result.start.get('hour')).toBe(21);
    });

    testSingleCase(chrono, '24 October, 9 p.m.', new Date(2017, 7-1, 7, 15), (result) => {
        expect(result.text).toBe('24 October, 9 p.m.');
        expect(result.start.get('day')).toBe(24);
        expect(result.start.get('month')).toBe(10);
        expect(result.start.get('hour')).toBe(21);
    });

    testSingleCase(chrono, '24 October 10 o clock', new Date(2017, 7-1, 7, 15), (result) => {
        expect(result.text).toBe('24 October 10 o clock');
        expect(result.start.get('day')).toBe(24);
        expect(result.start.get('month')).toBe(10);
        expect(result.start.get('hour')).toBe(10);
    });
});

test("Test - year 90's parsing", () => {

    testSingleCase(chrono, '03 Aug 96', new Date(2012,7,10), (result) => {
        expect(result.text).toBe('03 Aug 96');

        expect(result.start.get('year')).toBe(1996);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(3);
    });

    testSingleCase(chrono, '3 Aug 96', new Date(2012,7,10), (result) => {
        expect(result.text).toBe('3 Aug 96');

        expect(result.start.get('year')).toBe(1996);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(3);
    });

    testSingleCase(chrono, '9 Aug 96', new Date(2012,7,10), (result) => {
        expect(result.text).toBe('9 Aug 96');

        expect(result.start.get('year')).toBe(1996);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(9);
    });
})

test("Test - Forward Option", () => {

    testSingleCase(chrono.casual, '22-23 Feb at 7pm', new Date(2016, 3-1, 15), (result) => {

        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(2);
        expect(result.start.get('day')).toBe(22);
        expect(result.start.get('hour')).toBe(19);

        expect(result.end.get('year')).toBe(2016);
        expect(result.end.get('month')).toBe(2);
        expect(result.end.get('day')).toBe(23);
        expect(result.end.get('hour')).toBe(19);
    });


    testSingleCase(chrono.casual, '22-23 Feb at 7pm', new Date(2016, 3-1, 15), {forwardDate: true}, (result) => {

        expect(result.start.get('year')).toBe(2017);
        expect(result.start.get('month')).toBe(2);
        expect(result.start.get('day')).toBe(22);
        expect(result.start.get('hour')).toBe(19);

        expect(result.end.get('year')).toBe(2017);
        expect(result.end.get('month')).toBe(2);
        expect(result.end.get('day')).toBe(23);
        expect(result.end.get('hour')).toBe(19);

    });
});

test("Test - Impossible Dates (Strict Mode)", function() {

    testUnexpectedResult(chrono.strict, '32 August 2014', new Date(2012,7,10));

    testUnexpectedResult(chrono.strict, '29 February 2014', new Date(2012,7,10));

    testUnexpectedResult(chrono.strict, '32 August', new Date(2012,7,10));

    testUnexpectedResult(chrono.strict, '29 February', new Date(2013,7,10))
});
