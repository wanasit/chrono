import * as chrono from '../../src/chrono';
import { testSingleCase, testUnexpectedResult } from '../test_util';

test("Test - Should skip euro style phone number", function() {

  testUnexpectedResult(chrono.strict, '80-32-89-89', new Date(2012,7,10))

});

test("Test - Should handle en dayname mm-dd-yy", function() {
  testSingleCase(chrono.strict, 'Friday 12-30-16', new Date(2012,7,10))
});

test("Test - Should handle en mm-dd-yy", function() {
  testSingleCase(chrono.strict, '12-30-16', new Date(2012,7,10))
});


test("Test - Should handle en dayname dd-mm-yy", function() {
  testSingleCase(chrono.strict, 'Friday 30-12-16', new Date(2012,7,10))
});

test("Test - Should handle en dd-mm-yy", function() {
  testSingleCase(chrono.strict, '30-12-16', new Date(2012,7,10))
});
