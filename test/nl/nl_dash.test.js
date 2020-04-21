var chrono = require('../../src/chrono');
test("Test - Should return false with euro style phone number", function() {
  var text = "80-32-89-89";
  var results = chrono.nl.parse(text, new Date(2020,4,21));
  expect(results.length).toBe(0)
});

test("Test - Should handle en dayname dd-mm-yy", function() {
  var text = "Vrijdag 30-12-16";
  var results = chrono.nl.parse(text, new Date(2020,4,21));
  expect(results.length).toBe(1)
});

test("Test - Should handle en dd-mm-yy", function() {
  var text = "30-12-16";
  var results = chrono.nl.parse(text, new Date(2020,4,21));
  expect(results.length).toBe(1)
});
