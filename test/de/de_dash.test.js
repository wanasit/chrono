import * as chrono from '../../src/chrono';
import { testSingleCase } from '../test_util';

test("Test - Should handle de dayname dd-mm-yy", () => {

    testSingleCase(chrono.strict, 'Freitag 30.12.16', (result) => {
        expect(result.text).toBe('Freitag 30.12.16')
    });
});
