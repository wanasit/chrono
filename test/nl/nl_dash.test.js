import {testSingleCase} from "../test_util";

var chrono = require('../../src/chrono');
test("Test - Should return false with euro style phone number", function() {
  var text = "80-32-89-89";
  var results = chrono.nl.parse(text, new Date(2020,4,21));
  expect(results.length).toBe(0)
});

test("Test - Should handle en dayname dd-mm-yy", function() {
  testSingleCase(chrono.nl, '30-12-16\n', new Date(2012, 7, 9), (result) => {
    expect(result.index).toBe(0);
    expect(result.text).toBe('30-12-16');

    expect(result.start).not.toBeNull();
    expect(result.start.get('year')).toBe(2016);
    expect(result.start.get('month')).toBe(12);
    expect(result.start.get('day')).toBe(30);


    expect(result.start.isCertain('day')).toBe(true);
    expect(result.start.isCertain('month')).toBe(true);
    expect(result.start.isCertain('year')).toBe(true);
  });
});

test("Test - Should handle en dd-mm-yy", function() {
  var text = "30-12-16";
  var results = chrono.nl.parse(text, new Date(2020,4,21));
  expect(results.length).toBe(1)
});

test("Test - Should handle en dd-mm-yyyy", function() {
  var text = 'Datum: 02/01/2020\n' +
      ' Datum: 03/01/2020 Datum: 04/01/2020';
  var results = chrono.parse(text, new Date(2020,4,21));
  expect(results.length).toBe(3);
  expect(results[0].start).not.toBeNull();
  expect(results[0].index).toBe(7);
  expect(results[0].text).toBe('02/01/2020\n');
});
