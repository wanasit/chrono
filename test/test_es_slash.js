// QUnit Setup
//-------------------------------------

var test = function() {
    QUnit.test.apply(QUnit.test, arguments);
}

var ok = function() {
    QUnit.assert.ok.apply(QUnit.assert, arguments);
}

//-------------------------------------

test("Test - Single Expression", function() {

    var text = "lunes 8/2/2016";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2016, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 2, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 8, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        ok(result.index == 0, 'Wrong index')
        ok(result.text == 'lunes 8/2/2016', result.text )

        var resultDate = result.start.date();
        var expectDate = new Date(2016, 2-1, 8, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

});
