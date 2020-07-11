import * as chrono from '../../src';
import {testSingleCase} from '../test_util';

test("Test - Month expression", function() {

    testSingleCase(chrono, 'September 2012', (result) => {
        
        expect(result.index).toBe(0);
        expect(result.text).toBe('September 2012');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(9);

        expect(result.start).toBeDate(new Date(2012, 9-1, 1, 12));
    });

    testSingleCase(chrono, 'Sept 2012', (result) => {

        expect(result.index).toBe(0);
        expect(result.text).toBe('Sept 2012');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(9);

        expect(result.start).toBeDate(new Date(2012, 9-1, 1, 12));
    });

    testSingleCase(chrono, 'Sep 2012', (result) => {

        expect(result.index).toBe(0);
        expect(result.text).toBe('Sep 2012');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(9);

        expect(result.start).toBeDate(new Date(2012, 9-1, 1, 12));
    });

    testSingleCase(chrono, 'Sep. 2012', (result) => {

        expect(result.index).toBe(0);
        expect(result.text).toBe('Sep. 2012');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(9);

        expect(result.start).toBeDate(new Date(2012, 9-1, 1, 12));
    });


    testSingleCase(chrono, 'Sep-2012', (result) => {

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(9);

        expect(result.index).toBe(0);
        expect(result.text).toBe('Sep-2012');

        expect(result.start).toBeDate(new Date(2012, 9-1, 1, 12));
    });
});

test("Test - Month expression in context", function() {


    testSingleCase(chrono, 'The date is Sep 2012 is the date', (result) => {

        expect(result.index).toBe(12);
        expect(result.text).toBe('Sep 2012');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(9);

        expect(result.start).toBeDate(new Date(2012, 9-1, 1, 12));
    });


    testSingleCase(chrono, 'By Angie Mar November 2019', (result) => {

        expect(result.text).toBe('November 2019');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2019);
        expect(result.start.get('month')).toBe(11);

        expect(result.start).toBeDate(new Date(2019, 11-1, 1, 12));
    });

});

test("Test - Month slash expression", function() {

    testSingleCase(chrono, '9/2012', new Date(2012,7,10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(9);

        expect(result.index).toBe(0);
        expect(result.text).toBe('9/2012');

        expect(result.start).toBeDate(new Date(2012, 9-1, 1, 12));
    });

    testSingleCase(chrono, '09/2012', new Date(2012,7,10), (result) => {
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(9);

        expect(result.index).toBe(0);
        expect(result.text).toBe('09/2012');

        expect(result.start).toBeDate(new Date(2012, 9-1, 1, 12));
    });

});


test("Test - year 90's parsing", () => {

    testSingleCase(chrono, 'Aug 96', new Date(2012,7,10), (result) => {
        expect(result.text).toBe('Aug 96');

        expect(result.start.get('year')).toBe(1996);
        expect(result.start.get('month')).toBe(8);
    });

    testSingleCase(chrono, '96 Aug 96', new Date(2012,7,10), (result) => {
        expect(result.text).toBe('Aug 96');

        expect(result.start.get('year')).toBe(1996);
        expect(result.start.get('month')).toBe(8);
    });
})
