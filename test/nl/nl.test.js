import * as chrono from '../../src/chrono';
import { testSingleCase } from '../test_util';

test('Test - Random text', function() {

    testSingleCase(chrono.nl, 'Datum: 15-mrt-20', (result) => {

        expect(result.index).toBe(7);
        expect(result.text).toBe('15-mrt-20');
        expect(result.start.get('day')).toBe(15);
        expect(result.start.get('month')).toBe(3);
        expect(result.start.get('year')).toBe(2020);
    });


    testSingleCase(chrono.nl, '9:00 tot 17:00, dinsdag 20 mei 2013', (result) => {

        expect(result.start.get('hour')).toBe(9);
        expect(result.end.get('hour')).toBe(17);
        expect(result.end.get('meridiem')).toBe(1);
        expect(result.end.get('day')).toBe(20);
        expect(result.end.get('month')).toBe(5);
        expect(result.end.get('year')).toBe(2013);
    });
});
