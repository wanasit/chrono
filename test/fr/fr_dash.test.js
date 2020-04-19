import * as chrono from '../../src/chrono';
import { testSingleCase } from '../test_util';

test("Test - Should handle fr dayname mm-dd-yy", function() {
  testSingleCase(chrono.strict, 'Vendredi 12-30-16', new Date(2012,7,10))
});

test("Test - Should handle fr mm-dd-yy", function() {
  testSingleCase(chrono.strict, '12-30-16', new Date(2012,7,10))
});


test("Test - Should handle fr dayname dd-mm-yy", function() {
  testSingleCase(chrono.strict, 'Vendredi 30-12-16', new Date(2012,7,10))
});

test("Test - Should handle fr dd-mm-yy", function() {
  testSingleCase(chrono.strict, '30-12-16', new Date(2012,7,10))
});
