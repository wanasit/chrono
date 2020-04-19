import * as chrono from '../../src/chrono';
import { testSingleCase, testUnexpectedResult } from '../test_util';

test("Test - Single Expression", function() {


    testSingleCase(chrono, '8:10', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('8:10');

        expect(result.start).not.toBeNull();
        expect(result.start.get('hour')).toBe(8);
        expect(result.start.get('minute')).toBe(10);


        expect(result.start.isCertain('day')).toBe(false);
        expect(result.start.isCertain('month')).toBe(false);
        expect(result.start.isCertain('year')).toBe(false);
        expect(result.start.isCertain('hour')).toBe(true);
        expect(result.start.isCertain('minute')).toBe(true);
        expect(result.start.isCertain('second')).toBe(false);
        expect(result.start.isCertain('millisecond')).toBe(false);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 8, 10));
    });

    testSingleCase(chrono, '8:10 PM', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('8:10 PM');

        expect(result.start).not.toBeNull();
        expect(result.start.get('hour')).toBe(20);
        expect(result.start.get('minute')).toBe(10);
        expect(result.start.isCertain('second')).toBe(false);
        expect(result.start.isCertain('millisecond')).toBe(false);


        expect(result.start).toBeDate(new Date(2012, 7, 10, 20, 10));
    });

    testSingleCase(chrono, '1230pm', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('1230pm');

        expect(result.start).not.toBeNull();
        expect(result.start.get('hour')).toBe(12);
        expect(result.start.get('minute')).toBe(30);
        expect(result.start.isCertain('second')).toBe(false);
        expect(result.start.isCertain('millisecond')).toBe(false);


        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 30));
    });

    testSingleCase(chrono, '5:16p', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('5:16p');

        expect(result.start).not.toBeNull();
        expect(result.start.get('hour')).toBe(17);
        expect(result.start.get('minute')).toBe(16);
        expect(result.start.isCertain('second')).toBe(false);
        expect(result.start.isCertain('millisecond')).toBe(false);


        expect(result.start).toBeDate(new Date(2012, 7, 10, 17, 16));
    });

    testSingleCase(chrono, '5:16 p.m.', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('5:16 p.m.');

        expect(result.start).not.toBeNull();
        expect(result.start.get('hour')).toBe(17);
        expect(result.start.get('minute')).toBe(16);
        expect(result.start.isCertain('second')).toBe(false);
        expect(result.start.isCertain('millisecond')).toBe(false);


        expect(result.start).toBeDate(new Date(2012, 7, 10, 17, 16));
    });

    testSingleCase(chrono, 'Lets meet at 6.13 AM', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(10);
        expect(result.text).toBe('at 6.13 AM');

        expect(result.start).not.toBeNull();
        expect(result.start.get('hour')).toBe(6);
        expect(result.start.get('minute')).toBe(13);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 6, 13));
    });


    testSingleCase(chrono, '1-3pm', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('1-3pm');

        expect(result.start).not.toBeNull();
        expect(result.start.get('hour')).toBe(13);
        expect(result.start.get('minute')).toBe(0);
        expect(result.start.get('meridiem')).toBe(1);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 13, 0));

        expect(result.end).not.toBeNull();
        expect(result.end.get('hour')).toBe(15);
        expect(result.end.get('minute')).toBe(0);
        expect(result.end.get('meridiem')).toBe(1);

        expect(result.end).toBeDate(new Date(2012, 7, 10, 15, 0));
    });


    testSingleCase(chrono, '11pm-2', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('11pm-2');

        expect(result.start).not.toBeNull();
        expect(result.start.get('hour')).toBe(23);
        expect(result.start.get('minute')).toBe(0);
        expect(result.start.get('meridiem')).toBe(1);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 23, 0));

        expect(result.end).not.toBeNull();
        expect(result.end.get('hour')).toBe(2);
        expect(result.end.get('minute')).toBe(0);
        expect(result.end.get('meridiem')).toBe(0);

        expect(result.end).toBeDate(new Date(2012, 7, 11, 2, 0));
    });
});

test("Test - Range Expression", function() {

    testSingleCase(chrono, '8:10 - 12.32', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('8:10 - 12.32');

        expect(result.start).not.toBeNull();
        expect(result.start.get('hour')).toBe(8);
        expect(result.start.get('minute')).toBe(10);

        expect(result.start.isCertain('day')).toBe(false);
        expect(result.start.isCertain('month')).toBe(false);
        expect(result.start.isCertain('year')).toBe(false);
        expect(result.start.isCertain('hour')).toBe(true);
        expect(result.start.isCertain('minute')).toBe(true);
        expect(result.start.isCertain('second')).toBe(false);
        expect(result.start.isCertain('millisecond')).toBe(false);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 8, 10));

        expect(result.end).not.toBeNull();
        expect(result.end.get('hour')).toBe(12);
        expect(result.end.get('minute')).toBe(32);

        expect(result.end.isCertain('day')).toBe(false);
        expect(result.end.isCertain('month')).toBe(false);
        expect(result.end.isCertain('year')).toBe(false);
        expect(result.end.isCertain('hour')).toBe(true);
        expect(result.end.isCertain('minute')).toBe(true);
        expect(result.end.isCertain('second')).toBe(false);
        expect(result.end.isCertain('millisecond')).toBe(false);

        expect(result.end).toBeDate(new Date(2012, 7, 10, 12, 32));
    });

    testSingleCase(chrono, ' from 6:30pm to 11:00pm ', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe('from 6:30pm to 11:00pm');

        expect(result.start).not.toBeNull();
        expect(result.start.get('hour')).toBe(18);
        expect(result.start.get('minute')).toBe(30);
        expect(result.start.get('meridiem')).toBe(1);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 18, 30));

        expect(result.end).not.toBeNull();
        expect(result.end.get('hour')).toBe(23);
        expect(result.end.get('minute')).toBe(0);
        expect(result.end.get('meridiem')).toBe(1);

        expect(result.end).toBeDate(new Date(2012, 7, 10, 23, 0));
    });

});

test("Test - Impossible", function() {

    testUnexpectedResult(chrono, '8:62', new Date(2012,7,10));

    testUnexpectedResult(chrono, '25:12', new Date(2012,7,10));

    testUnexpectedResult(chrono, '13.12 PM', new Date(2012,7,10))
});

test("Test - Date + Time Expression", function() {

    testSingleCase(chrono, 'Something happen on 2014-04-18 3.00 AM', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(20);
        expect(result.text).toBe('2014-04-18 3.00 AM');

        expect(result.start.get('year')).toBe(2014);
        expect(result.start.get('month')).toBe(4);
        expect(result.start.get('day')).toBe(18);
        expect(result.start.get('hour')).toBe(3);
        expect(result.start.get('minute')).toBe(0);
        expect(result.start.get('second')).toBe(0);
        expect(result.start.get('millisecond')).toBe(0);
        expect(result.start.isCertain('millisecond')).toBe(false);

        expect(result.start).toBeDate(new Date(2014, 4-1, 18, 3, 0));
    });

    testSingleCase(chrono, 'Something happen on August 10, 2012 10:12:59 pm', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(20);
        expect(result.text).toBe('August 10, 2012 10:12:59 pm');

        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('hour')).toBe(22);
        expect(result.start.get('minute')).toBe(12);
        expect(result.start.get('second')).toBe(59);
        expect(result.start.get('millisecond')).toBe(0);
        expect(result.start.isCertain('millisecond')).toBe(false);

        expect(result.start).toBeDate(new Date(2012, 8-1, 10, 22, 12, 59));
    });

    testSingleCase(chrono, 'Something happen on 2014-04-18 7:00 - 8:00 AM...', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(20);
        expect(result.text).toBe('2014-04-18 7:00 - 8:00 AM');

        expect(result.start.get('year')).toBe(2014);
        expect(result.start.get('month')).toBe(4);
        expect(result.start.get('day')).toBe(18);
        expect(result.start.get('hour')).toBe(7);
        expect(result.start.get('minute')).toBe(0);
        expect(result.start.get('second')).toBe(0);
        expect(result.start.get('millisecond')).toBe(0);
        expect(result.start.get('meridiem')).toBe(0);
        expect(result.start.isCertain('millisecond')).toBe(false);

        expect(result.start).toBeDate(new Date(2014, 4-1, 18, 7, 0));


        expect(result.end.get('year')).toBe(2014);
        expect(result.end.get('month')).toBe(4);
        expect(result.end.get('day')).toBe(18);
        expect(result.end.get('hour')).toBe(8);
        expect(result.end.get('minute')).toBe(0);
        expect(result.end.get('second')).toBe(0);
        expect(result.end.get('millisecond')).toBe(0);
        expect(result.end.get('meridiem')).toBe(0);
        expect(result.end.isCertain('millisecond')).toBe(false);

        expect(result.end).toBeDate(new Date(2014, 4-1, 18, 8, 0));
    });



    testSingleCase(chrono, 'Something happen on 2014-04-18 7:00 - 8:00 PM...', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(20);
        expect(result.text).toBe('2014-04-18 7:00 - 8:00 PM');

        expect(result.start.get('year')).toBe(2014);
        expect(result.start.get('month')).toBe(4);
        expect(result.start.get('day')).toBe(18);
        expect(result.start.get('hour')).toBe(19);
        expect(result.start.get('minute')).toBe(0);
        expect(result.start.get('second')).toBe(0);
        expect(result.start.get('millisecond')).toBe(0);
        expect(result.start.get('meridiem')).toBe(1);
        expect(result.start.isCertain('millisecond')).toBe(false);

        expect(result.start).toBeDate(new Date(2014, 4-1, 18, 19, 0));


        expect(result.end.get('year')).toBe(2014);
        expect(result.end.get('month')).toBe(4);
        expect(result.end.get('day')).toBe(18);
        expect(result.end.get('hour')).toBe(20);
        expect(result.end.get('minute')).toBe(0);
        expect(result.end.get('second')).toBe(0);
        expect(result.end.get('millisecond')).toBe(0);
        expect(result.end.get('meridiem')).toBe(1);
        expect(result.end.isCertain('millisecond')).toBe(false);

        expect(result.end).toBeDate(new Date(2014, 4-1, 18, 20, 0));
    });
});


test("Test - Time Expression's Meridiem imply", function() {

    testSingleCase(chrono, '1pm-3', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('1pm-3');

        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('hour')).toBe(13);
        expect(result.start.get('minute')).toBe(0);
        expect(result.start.get('second')).toBe(0);
        expect(result.start.get('millisecond')).toBe(0);
        expect(result.start.get('meridiem')).toBe(1);
        expect(result.start.isCertain('meridiem')).toBe(true);

        expect(result.end.get('year')).toBe(2012);
        expect(result.end.get('month')).toBe(8);
        expect(result.end.get('day')).toBe(11);
        expect(result.end.get('hour')).toBe(3);
        expect(result.end.get('minute')).toBe(0);
        expect(result.end.get('second')).toBe(0);
        expect(result.end.get('millisecond')).toBe(0);
        expect(result.end.isCertain('meridiem')).toBe(false)
    });

    testSingleCase(chrono, '2014-04-18 1pm-3', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('2014-04-18 1pm-3');

        expect(result.start.get('year')).toBe(2014);
        expect(result.start.get('month')).toBe(4);
        expect(result.start.get('day')).toBe(18);
        expect(result.start.get('hour')).toBe(13);
        expect(result.start.get('minute')).toBe(0);
        expect(result.start.get('second')).toBe(0);
        expect(result.start.get('millisecond')).toBe(0);
        expect(result.start.get('meridiem')).toBe(1);
        expect(result.start.isCertain('meridiem')).toBe(true);

        expect(result.end.get('year')).toBe(2014);
        expect(result.end.get('month')).toBe(4);
        expect(result.end.get('day')).toBe(19);
        expect(result.end.get('hour')).toBe(3);
        expect(result.end.get('minute')).toBe(0);
        expect(result.end.get('second')).toBe(0);
        expect(result.end.get('millisecond')).toBe(0);
        expect(result.end.isCertain('meridiem')).toBe(false)
    });

    testSingleCase(chrono, 'today from 1pm-3', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('today from 1pm-3');

        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('hour')).toBe(13);
        expect(result.start.get('minute')).toBe(0);
        expect(result.start.get('second')).toBe(0);
        expect(result.start.get('millisecond')).toBe(0);
        expect(result.start.get('meridiem')).toBe(1);
        expect(result.start.isCertain('meridiem')).toBe(true);

        expect(result.end.get('year')).toBe(2012);
        expect(result.end.get('month')).toBe(8);
        expect(result.end.get('day')).toBe(11);
        expect(result.end.get('hour')).toBe(3);
        expect(result.end.get('minute')).toBe(0);
        expect(result.end.get('second')).toBe(0);
        expect(result.end.get('millisecond')).toBe(0);
        expect(result.end.isCertain('meridiem')).toBe(false)
    });

    testSingleCase(chrono, 'today from 1am-3', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('today from 1am-3');

        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('hour')).toBe(1);
        expect(result.start.get('minute')).toBe(0);
        expect(result.start.get('second')).toBe(0);
        expect(result.start.get('millisecond')).toBe(0);
        expect(result.start.get('meridiem')).toBe(0);
        expect(result.start.isCertain('meridiem')).toBe(true);

        expect(result.end.get('year')).toBe(2012);
        expect(result.end.get('month')).toBe(8);
        expect(result.end.get('day')).toBe(10);
        expect(result.end.get('hour')).toBe(3);
        expect(result.end.get('minute')).toBe(0);
        expect(result.end.get('second')).toBe(0);
        expect(result.end.get('millisecond')).toBe(0);
        expect(result.end.isCertain('meridiem')).toBe(false)
    });
});


test("Test - Timezone extraction", function() {

    testSingleCase(chrono, 'friday at 2 pm', new Date(2016, 3, 28), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.isCertain('timezoneOffset')).toBe(false);
        expect(!result.start.get('timezoneOffset')).not.toBeNull();
    });


    testSingleCase(chrono, 'friday at 2 pm EST', new Date(2016, 3, 28), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.isCertain('timezoneOffset')).toBe(true);
        expect(result.start.get('timezoneOffset')).toBe(-300);
    });


    testSingleCase(chrono, 'friday at 2 pm est', new Date(2016, 3, 28), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.isCertain('timezoneOffset')).toBe(true);
        expect(result.start.get('timezoneOffset')).toBe(-300);
    });


    testSingleCase(chrono, 'friday at 2 pm establish ...', new Date(2016, 3, 28), (result, text) => {

        expect(result.text).toBe('friday at 2 pm');
        expect(result.start.isCertain('timezoneOffset')).toBe(false);
        expect(!result.start.get('timezoneOffset')).not.toBeNull();
    });


    testSingleCase(chrono, 'friday at 2 pm I will do something', new Date(2016, 3, 28), (result, text) => {

        expect(result.text).toBe('friday at 2 pm');
        expect(result.start.isCertain('timezoneOffset')).toBe(false);
        expect(!result.start.get('timezoneOffset')).not.toBeNull();
    });
});


test("Test - Timezone extraction override", function() {

    testSingleCase(chrono, 'friday at 2 pm IST', new Date(2016, 3, 28), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.isCertain('timezoneOffset')).toBe(true);
        expect(result.start.get('timezoneOffset')).toBe(330);
    });

    var options = { timezones: { 'IST' : 60 }};
    testSingleCase(chrono, 'friday at 2 pm IST', new Date(2016, 3, 28), options, (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.isCertain('timezoneOffset')).toBe(true);
        expect(result.start.get('timezoneOffset')).toBe(60);
    });
});

test("Test - Milliseconds", function() {

    testSingleCase(chrono, 'friday at 10:31:50.522 - 10:45:50.122 pm', new Date(2016, 3, 28), (result, text) => {

        expect(result.text).toBe(text);

        expect(result.start.isCertain('millisecond')).toBe(true);
        expect(result.start.get('millisecond')).toBe(522);
        expect(result.start.get('second')).toBe(50);
        expect(result.start.get('minute')).toBe(31);
        expect(result.start.get('hour')).toBe(22);

        expect(result.end.isCertain('millisecond')).toBe(true);
        expect(result.end.get('millisecond')).toBe(122);
        expect(result.end.get('second')).toBe(50);
        expect(result.end.get('minute')).toBe(45);
        expect(result.end.get('hour')).toBe(22);
    });


    testSingleCase(chrono, 'friday at 10:31:50.522142 - 10:45:50.122124 pm', new Date(2016, 3, 28), (result, text) => {

        expect(result.text).toBe(text);

        expect(result.start.isCertain('millisecond')).toBe(true);
        expect(result.start.get('millisecond')).toBe(522);
        expect(result.start.get('second')).toBe(50);
        expect(result.start.get('minute')).toBe(31);
        expect(result.start.get('hour')).toBe(22);

        expect(result.end.isCertain('millisecond')).toBe(true);
        expect(result.end.get('millisecond')).toBe(122);
        expect(result.end.get('second')).toBe(50);
        expect(result.end.get('minute')).toBe(45);
        expect(result.end.get('hour')).toBe(22);
    });
});

test("Test - Random date + time expression", function() {

    testSingleCase(chrono, 'monday 4/29/2013 630-930am', (result, text) => {

        expect(result.text).toBe(text);
    });

    testSingleCase(chrono, 'wednesday 5/1/2013 1115am', (result, text) => {

        expect(result.text).toBe(text);
    });

    testSingleCase(chrono, 'friday 5/3/2013 1230pm', (result, text) => {

        expect(result.text).toBe(text);
    });


    testSingleCase(chrono, 'sunday 5/6/2013  750am-910am', (result, text) => {

        expect(result.text).toBe(text);
    });

    testSingleCase(chrono, 'monday 5/13/2013 630-930am', (result, text) => {

        expect(result.text).toBe(text);
    });

    testSingleCase(chrono, 'wednesday 5/15/2013 1030am', (result, text) => {

        expect(result.text).toBe(text);
    });

    testSingleCase(chrono, 'friday 6/21/2013 2:30', (result, text) => {

        expect(result.text).toBe(text);
    });

    testSingleCase(chrono, 'tuesday 7/2/2013 1-230 pm', (result, text) => {

        expect(result.text).toBe(text);
    });

    testSingleCase(chrono, 'Monday, 6/24/2013, 7:00pm - 8:30pm', (result, text) => {

        expect(result.text).toBe(text);
    });

    testSingleCase(chrono, 'Thursday6/20/2013 from 7:00 PM to 10:00 PM', (result, text) => {

        expect(result.text).toBe(text);
    });

    testSingleCase(chrono, 'Wednesday, July 03, 2013 2pm', (result, text) => {

        expect(result.text).toBe(text);
    });


    testSingleCase(chrono, '6pm', (result, text) => {

        expect(result.text).toBe(text);
    });

    testSingleCase(chrono, '6 pm', (result, text) => {

        expect(result.text).toBe(text);
    });

    testSingleCase(chrono, '7-10pm', (result, text) => {

        expect(result.text).toBe(text);
    });

    testSingleCase(chrono, '11.1pm', (result, text) => {

        expect(result.text).toBe(text);
    });

    testSingleCase(chrono, 'at 12', (result, text) => {

        expect(result.text).toBe(text);
    });

    testSingleCase(chrono, 'at noon', (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('hour')).toBe(12);
        expect(result.start.get('hour')).toBe(12);
    });

    testSingleCase(chrono, 'at midnight', (result, text) => {

        expect(result.text).toBe(text);
    });

    testSingleCase(chrono, 'at 7 oclock', (result, text) => {

        expect(result.text).toBe(text);
    });

    testSingleCase(chrono, 'at 7 o clock', (result, text) => {

        expect(result.text).toBe(text);
    });

    testSingleCase(chrono, "at 7 o'clock", (result, text) => {

        expect(result.text).toBe(text);
    });

    testSingleCase(chrono, "at 7-8 o'clock", (result, text) => {

        expect(result.text).toBe(text);
    });

    testUnexpectedResult(chrono, 'that I need to know or am I covered?');
});