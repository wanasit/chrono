import * as chrono from '../../src/chrono';
import { testSingleCase, testUnexpectedResult } from '../test_util';

test("Test - Should handle es dayname dd-mm-yy", function() {

  testSingleCase(chrono.strict, 'Viernes 30-12-16', new Date(2012,7,10));

});

test("Test - Should handle es dd-mm-yy", function() {

  testSingleCase(chrono.strict, '30-12-16', new Date(2012,7,10));

});
