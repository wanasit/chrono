var chrono = require('../src/chrono');
test("Test - Should return false with euro style phone number", function() {
  var text = "80-32-89-89";
  var results = chrono.strict.parse(text, new Date(2012,7,10));
  expect(results.length).toBe(0)
});

test("Test - Should handle EN dayname mm-dd-yy", function() {
  var text = "Friday 12-30-16";
  var results = chrono.strict.parse(text, new Date(2012,7,10));
  expect(results.length).toBe(1)
});

test("Test - Should handle EN mm-dd-yy", function() {
  var text = "12-30-16";
  var results = chrono.strict.parse(text, new Date(2012,7,10));
  expect(results.length).toBe(1)
});


test("Test - Should handle EN dayname dd-mm-yy", function() {
  var text = "Friday 30-12-16";
  var results = chrono.strict.parse(text, new Date(2012,7,10));
  expect(results.length).toBe(1)
});

test("Test - Should handle EN dd-mm-yy", function() {
  var text = "30-12-16";
  var results = chrono.strict.parse(text, new Date(2012,7,10));
  expect(results.length).toBe(1)
});
