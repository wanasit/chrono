
test("Test - Should handle ES dayname dd-mm-yy", function() {
  var text = "Viernes 30-12-16";
  var results = chrono.strict.parse(text, new Date(2012,7,10));
  ok(results.length == 1, JSON.stringify( results ) )
});

test("Test - Should handle ES dd-mm-yy", function() {
  var text = "30-12-16";
  var results = chrono.strict.parse(text, new Date(2012,7,10));
  ok(results.length == 1, JSON.stringify( results ) )
});
