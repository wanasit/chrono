import * as chrono from '../../src/chrono';
import { testSingleCase } from '../test_util';

test("Test - Should handle dayname dd-mm-yy", function() {

    testSingleCase(chrono.strict, 'Sexta-feira 30-12-16', new Date(2012,7,10))
});

test("Test - Should handle dd-mm-yy", function() {

    testSingleCase(chrono.strict, '30-12-16', new Date(2012,7,10))
});
