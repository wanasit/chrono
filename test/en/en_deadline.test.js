import * as chrono from '../../src/chrono';
import { testSingleCase, testUnexpectedResult } from '../test_util';

test("Test - Single Expression", function() {

    testSingleCase(chrono, 'we have to make something in 5 days.', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(26);
        expect(result.text).toBe('in 5 days');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(15);

        expect(result.start).toBeDate(new Date(2012, 8-1, 15, 12));
    });



    testSingleCase(chrono, 'we have to make something in five days.', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(26);
        expect(result.text).toBe('in five days');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(15);

        expect(result.start).toBeDate(new Date(2012, 8-1, 15, 12));
    });


    testSingleCase(chrono, 'we have to make something within 10 day', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(26);
        expect(result.text).toBe('within 10 day');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(20);

        expect(result.start).toBeDate(new Date(2012, 8-1, 20, 12));
    });


    testSingleCase(chrono, 'in 5 minutes', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('in 5 minutes');

        expect(result.start).toBeDate(new Date(2012,7,10,12,19));
    });

    testSingleCase(chrono, 'within 1 hour', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('within 1 hour');

        expect(result.start).toBeDate(new Date(2012,7,10,13,14));
    });

    testSingleCase(chrono, 'In 5 minutes I will go home', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('In 5 minutes');

        expect(result.start).toBeDate(new Date(2012,7,10,12,19));
    });


    testSingleCase(chrono, 'In 5 minutes A car need to move', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('In 5 minutes');

        expect(result.start).toBeDate(new Date(2012,7,10,12,19));
    });


    testSingleCase(chrono, 'In 5 seconds A car need to move', new Date(2012,7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('In 5 seconds');

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 14, 5));
    });


    testSingleCase(chrono, 'within half an hour', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('within half an hour');

        expect(result.start).toBeDate(new Date(2012,7,10,12,44));
    });


    testSingleCase(chrono, 'within two weeks', new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('within two weeks');

        expect(result.start).toBeDate(new Date(2012, 7, 24, 12));
    });


    testSingleCase(chrono, 'within a month', new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('within a month');

        expect(result.start).toBeDate(new Date(2012, 8, 10, 12));
    });


    testSingleCase(chrono, 'within a few months', new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('within a few months');

        expect(result.start).toBeDate(new Date(2012, 10, 10, 12));
    });


    testSingleCase(chrono, 'within one year', new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('within one year');

        expect(result.start).toBeDate(new Date(2013, 7, 10, 12));
    });


    testSingleCase(chrono, 'within one Year', new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('within one Year');

        expect(result.start).toBeDate(new Date(2013, 7, 10, 12));
    });


    testSingleCase(chrono, 'within One year', new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('within One year');

        expect(result.start).toBeDate(new Date(2013, 7, 10, 12));
    });


    testSingleCase(chrono, 'In 5 Minutes A car need to move', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('In 5 Minutes');

        expect(result.start).toBeDate(new Date(2012,7,10,12,19));
    });


    testSingleCase(chrono, 'In 5 mins a car need to move', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('In 5 mins');

        expect(result.start).toBeDate(new Date(2012,7,10,12,19));
    });

    testSingleCase(chrono, 'in a week', new Date(2016, 10-1, 1), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(10);
        expect(result.start.get('day')).toBe(8);
        expect(result.start.get('hour')).toBe(12);
    });

});


test("Test - Single Expression (Strict)", function() {

    testUnexpectedResult(chrono.strict, 'within one year', new Date(2012,7,10,12,14));


    testUnexpectedResult(chrono.strict, 'within a few months', new Date(2012, 8-1, 3))


    testUnexpectedResult(chrono.strict, 'within a few days', new Date(2012, 8-1, 3))
});


test("Test - Single Expression (Implied)", function() {

    var text = "within 30 days";
    var results = chrono.parse(text, new Date(2012,7,10,12,14));
    expect(results.length).toBe(1);
    expect(!results[0].start.isCertain('year')).not.toBeNull();
    expect(!results[0].start.isCertain('month')).not.toBeNull();
    expect(!results[0].start.isCertain('day')).not.toBeNull();
    expect(!results[0].start.isCertain('hour')).not.toBeNull();
    expect(!results[0].start.isCertain('minute')).not.toBeNull();
    expect(!results[0].start.isCertain('second')).not.toBeNull();

    var text = "within 30 months";
    var results = chrono.parse(text, new Date(2012,7,10,12,14));
    expect(results.length).toBe(1);
    expect(!results[0].start.isCertain('year')).not.toBeNull();
    expect(!results[0].start.isCertain('month')).not.toBeNull();
    expect(!results[0].start.isCertain('day')).not.toBeNull();
    expect(!results[0].start.isCertain('hour')).not.toBeNull();
    expect(!results[0].start.isCertain('minute')).not.toBeNull();
    expect(!results[0].start.isCertain('second')).not.toBeNull();

    var text = "within 30 years";
    var results = chrono.parse(text, new Date(2012,7,10,12,14));
    expect(results.length).toBe(1);
    expect(!results[0].start.isCertain('year')).not.toBeNull();
    expect(!results[0].start.isCertain('month')).not.toBeNull();
    expect(!results[0].start.isCertain('day')).not.toBeNull();
    expect(!results[0].start.isCertain('hour')).not.toBeNull();
    expect(!results[0].start.isCertain('minute')).not.toBeNull();
    expect(!results[0].start.isCertain('second')).not.toBeNull();

    var text = "within 5 hours";
    var results = chrono.parse(text, new Date(2012,7,10,12,14));
    expect(results.length).toBe(1);
    expect(!results[0].start.isCertain('year')).not.toBeNull();
    expect(!results[0].start.isCertain('month')).not.toBeNull();
    expect(!results[0].start.isCertain('day')).not.toBeNull();
    expect(!results[0].start.isCertain('hour')).not.toBeNull();
    expect(!results[0].start.isCertain('minute')).not.toBeNull();
    expect(!results[0].start.isCertain('second')).not.toBeNull();

    var text = "within 5 minutes";
    var results = chrono.parse(text, new Date(2012,7,10,12,14));
    expect(results.length).toBe(1);
    expect(!results[0].start.isCertain('year')).not.toBeNull();
    expect(!results[0].start.isCertain('month')).not.toBeNull();
    expect(!results[0].start.isCertain('day')).not.toBeNull();
    expect(!results[0].start.isCertain('hour')).not.toBeNull();
    expect(!results[0].start.isCertain('minute')).not.toBeNull();
    expect(!results[0].start.isCertain('second')).not.toBeNull();

    var text = "within 5 seconds";
    var results = chrono.parse(text, new Date(2012,7,10,12,14));
    expect(results.length).toBe(1);
    expect(!results[0].start.isCertain('year')).not.toBeNull();
    expect(!results[0].start.isCertain('month')).not.toBeNull();
    expect(!results[0].start.isCertain('day')).not.toBeNull();
    expect(!results[0].start.isCertain('hour')).not.toBeNull();
    expect(!results[0].start.isCertain('minute')).not.toBeNull();
    expect(!results[0].start.isCertain('second')).not.toBeNull();

});

