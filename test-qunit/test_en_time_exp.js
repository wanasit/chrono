
test("Test - Single Expression", function() {


    var text = "8:10";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index')
        ok(result.text == '8:10', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('hour') == 8, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )


        ok(!result.start.isCertain('day'))
        ok(!result.start.isCertain('month'))
        ok(!result.start.isCertain('year'))
        ok(result.start.isCertain('hour'))
        ok(result.start.isCertain('minute'))
        ok(result.start.isCertain('second'))

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 8, 10);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "8:10 PM";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index')
        ok(result.text == '8:10 PM', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('hour') == 20, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 20, 10);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "Lets meet at 6.13 AM";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 10, 'Wrong index')
        ok(result.text == 'at 6.13 AM', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('hour') == 6, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 13, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 6, 13);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }
});

test("Test - Impossible", function() {

    var text = "8:62";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 0, JSON.stringify( results ) )

    var text = "25:12";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 0, JSON.stringify( results ) )

    var text = "13.12 PM";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 0, JSON.stringify( results ) )
});


