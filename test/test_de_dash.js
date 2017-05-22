// QUnit Setup
//-------------------------------------

var test = function() {
    QUnit.test.apply(QUnit.test, arguments);
}

var ok = function() {
    QUnit.assert.ok.apply(QUnit.assert, arguments);
}

//-------------------------------------
test("Test - Should handle DE dayname dd-mm-yy", function() {
  var text = "Freitag 30.12.16";
  var results = chrono.strict.parse(text, new Date(2012,7,10));
  ok(results.length == 1, JSON.stringify( results ) )
});
