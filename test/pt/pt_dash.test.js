var chrono = require('../../src/chrono');

test("Test - Should handle pt dayname dd-mm-yy", function() {
  var text = "sexta 30-12-16";
  var results = chrono.strict.parse(text, new Date(2012,7,10));
  expect(results.length).toBe(1)
});

test("Test - Should handle pt dd-mm-yy", function() {
  var text = "30-12-16";
  var results = chrono.strict.parse(text, new Date(2012,7,10));
  expect(results.length).toBe(1)
});
