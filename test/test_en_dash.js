// QUnit Setup
//-------------------------------------

var test = function() {
    QUnit.test.apply(QUnit.test, arguments);
}

var ok = function() {
    QUnit.assert.ok.apply(QUnit.assert, arguments);
}

//-------------------------------------
test("Test - Should return false with euro style phone number", function() {
  var text = "80-32-89-89";
  var results = chrono.strict.parse(text, new Date(2012,7,10));
  ok(results.length == 0, JSON.stringify( results ) )
});

test("Test - Should handle EN dayname mm-dd-yy", function() {
  var text = "Friday 12-30-16";
  var results = chrono.strict.parse(text, new Date(2012,7,10));
  ok(results.length == 1, JSON.stringify( results ) )
});

test("Test - Should handle EN mm-dd-yy", function() {
  var text = "12-30-16";
  var results = chrono.strict.parse(text, new Date(2012,7,10));
  ok(results.length == 1, JSON.stringify( results ) )
});


test("Test - Should handle EN dayname dd-mm-yy", function() {
  var text = "Friday 30-12-16";
  var results = chrono.strict.parse(text, new Date(2012,7,10));
  ok(results.length == 1, JSON.stringify( results ) )
});

test("Test - Should handle EN dd-mm-yy", function() {
  var text = "30-12-16";
  var results = chrono.strict.parse(text, new Date(2012,7,10));
  ok(results.length == 1, JSON.stringify( results ) )
});
