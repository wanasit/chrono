import * as chrono from '../../src';
import {testSingleCase, testUnexpectedResult} from '../test_util';


test("Test - Date + Time Expression", function() {

    testSingleCase(chrono, 'Something happen on 2014-04-18 13:00 - 16:00 as', (result) => {
        expect(result.text).toBe('2014-04-18 13:00 - 16:00')

        expect(result.start).toBeDate(new Date(2014, 4-1, 18, 13))
        expect(result.end).toBeDate(new Date(2014, 4-1, 18, 16))
    })
});

test("Test - Time Expression", function() {

    testSingleCase(chrono, 'between 3:30-4:30pm', new Date(2020,7-1,6), (result) => {
        expect(result.text).toBe('3:30-4:30pm')

        expect(result.start).toBeDate(new Date(2020, 7-1, 6, 15, 30))
        expect(result.end).toBeDate(new Date(2020, 7-1, 6, 16, 30))
    })

    testSingleCase(chrono, '9:00 PST', new Date(2020,7-1,6), (result) => {
        expect(result.text).toBe('9:00 PST')

        expect(result.start.get('hour')).toBe(9)
        expect(result.start.get('minute')).toBe(0)
        expect(result.start.get('timezoneOffset')).toBe(-480)
    })
});

test('Test - Random text', function() {

    testSingleCase(chrono, 'Adam <Adam@supercalendar.com> написал(а):\nThe date is 02.07.2013', (result) => {
        expect(result.text).toBe('02.07.2013');
    });

    testSingleCase(chrono, '174 November 1,2001- March 31,2002', (result) => {
        expect(result.text).toBe('November 1,2001- March 31,2002');
    })

    testSingleCase(chrono, '...Thursday, December 15, 2011 Best Available Rate ', (result) => {
        expect(result.text).toBe('Thursday, December 15, 2011');
        expect(result.start.get('year')).toBe(2011);
    })

    testSingleCase(chrono, 'SUN 15SEP 11:05 AM - 12:50 PM', (result) => {
        expect(result.text).toBe('SUN 15SEP 11:05 AM - 12:50 PM');

        expect(result.end.get('hour')).toBe(12)
        expect(result.end.get('minute')).toBe(50)
    })

    testSingleCase(chrono, 'FRI 13SEP 1:29 PM - FRI 13SEP 3:29 PM', (result) => {
        expect(result.text).toBe('FRI 13SEP 1:29 PM - FRI 13SEP 3:29 PM');

        expect(result.start.get('day')).toBe(13)
        expect(result.start.get('hour')).toBe(13)
        expect(result.start.get('minute')).toBe(29)

        expect(result.end.get('day')).toBe(13)
        expect(result.end.get('hour')).toBe(15)
        expect(result.end.get('minute')).toBe(29)
    })

    testSingleCase(chrono, '9:00 AM to 5:00 PM, Tuesday, 20 May 2013', (result) => {
        expect(result.text).toBe('9:00 AM to 5:00 PM, Tuesday, 20 May 2013');

        expect(result.start).toBeDate(new Date(2013, 4, 20, 9, 0));
        expect(result.end).toBeDate(new Date(2013, 4, 20, 17, 0));
    })

    testSingleCase(chrono, 'Monday afternoon to last night', new Date(2017, 7-1, 7), (result) => {
        expect(result.text).toBe('Monday afternoon to last night');
        expect(result.start.get('day')).toBe(3);
        expect(result.start.get('month')).toBe(7);
    })
});

test("Test - Random non-date patterns", function() {

    testUnexpectedResult(chrono, ' 3');

    testUnexpectedResult(chrono, '       1');

    testUnexpectedResult(chrono, '  11 ');

    testUnexpectedResult(chrono, ' 0.5 ');

    testUnexpectedResult(chrono, ' 35.49 ');

    testUnexpectedResult(chrono, '12.53%');

    testUnexpectedResult(chrono, '6358fe2310> *5.0* / 5 Outstanding');

    testUnexpectedResult(chrono, '6358fe2310> *1.5* / 5 Outstanding');

    testUnexpectedResult(chrono, 'Total: $1,194.09 [image: View Reservation');

    testUnexpectedResult(chrono, 'Version: 1.1.3');

    testUnexpectedResult(chrono, 'Version: 1.1.30');

    testUnexpectedResult(chrono, 'Version: 1.10.30');
});


test("Test - Wikipedia Texts", function() {

    const text = 'October 7, 2011, of which details were not revealed out of respect to Jobs\'s family.[239] ' +
        'Apple announced on the same day that they had no plans for a public service, but were encouraging ' +
        '"well-wishers" to send their remembrance messages to an email address created to receive such messages.[240] ' +
        'Sunday, October 16, 2011';

    const results = chrono.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(2);

    {
        const result = results[0];
        expect(result.start.get('year')).toBe(2011);
        expect(result.start.get('month')).toBe(10);
        expect(result.start.get('day')  ).toBe(7);

        expect(result.index).toBe(0);
        expect(result.text).toBe('October 7, 2011');
    }

    {
        const result = results[1];
        expect(result.start.get('year')).toBe(2011);
        expect(result.start.get('month')).toBe(10);
        expect(result.start.get('day')  ).toBe(16);

        expect(result.index).toBe(297);
        expect(result.text).toBe('Sunday, October 16, 2011');
    }
});


test("Test - Parse multiple date results", function() {

    const text = 'I will see you at 2:30. If not I will see you somewhere between 3:30-4:30pm';
    const results = chrono.parse(text, new Date(2020,7-1,6));
    expect(results.length).toBe(2);

    {
        const result = results[0];
        expect(result.text).toBe('at 2:30');
        expect(result.start.get('year')).toBe(2020);
        expect(result.start.get('month')).toBe(7);
        expect(result.start.get('day')).toBe(6);
        expect(result.start.get('hour')).toBe(2);

        expect(result.end).toBeNull()
    }

    {
        const result = results[1];
        expect(result.text).toBe('3:30-4:30pm');

        expect(result.start.get('hour')).toBe(15);
        expect(result.start.get('minute')).toBe(30);

        expect(result.end.get('hour')).toBe(16);
        expect(result.end.get('minute')).toBe(30);
    }
});





