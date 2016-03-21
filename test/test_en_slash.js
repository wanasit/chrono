
test("Test - Single Expression", function() {
    var text = "The event is going ahead next month (04/2016)";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2016, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 4, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 1, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        ok(result.index == 37, 'Wrong index')
        ok(result.text == '04/2016', result.text )

        var resultDate = result.start.date();
        var expectDate = new Date(2016, 4-1, 1, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "Published: 06/2004";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2004, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 6, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 1, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        ok(result.index == 11, 'Wrong index')
        ok(result.text == '06/2004', result.text )

        var resultDate = result.start.date();
        var expectDate = new Date(2004, 6-1, 1, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "8/10/2012";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        ok(result.index == 0, 'Wrong index')
        ok(result.text == '8/10/2012', result.text )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = ": 8/1/2012";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 1, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        ok(result.index == 2, 'Wrong index')
        ok(result.text == '8/1/2012', result.text )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 1, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "8/10";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        ok(result.index == 0, 'Wrong index')
        ok(result.text == '8/10', result.text )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "The Deadline is 8/10/2012";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 16, 'Wrong index')
        ok(result.text == '8/10/2012', result.text )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "The Deadline is Tuesday 11/3/2015";
    var results = chrono.parse(text, new Date(2015,10,3));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 16, 'Wrong index')
        ok(result.text == 'Tuesday 11/3/2015', result.text )

        var resultDate = result.start.date();
        var expectDate = new Date(2015, 10, 3, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

});


test("Test - Single Expression Start with Year", function() {

    var text = "2012/8/10";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        ok(result.index == 0, 'Wrong index')
        ok(result.text == '2012/8/10', result.text )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "The Deadline is 2012/8/10";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 16, 'Wrong index')
        ok(result.text == '2012/8/10', result.text )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }
});


test("Test - Range Expression", function() {


    var text = "8/10/2012 - 8/15/2012";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){

        ok(result.index == 0, 'Wrong index')
        ok(result.text == '8/10/2012 - 8/15/2012', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    
        ok(result.end, JSON.stringify(result.start) )
        ok(result.end.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.end.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.end.get('day') == 15, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        
        var resultDate = result.end.date();
        var expectDate = new Date(2012, 8-1, 15, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    
    }
});

test('Test - Random date patterns', function() {
    var expectDate = new Date(2015, 4, 25, 12, 0);

    text = "2015-05-25";
    results = chrono.parse(text);
    resultDate = results[0].start.date();
    ok(results.length == 1, JSON.stringify(results) )
    ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 1000, resultDate +'/' +expectDate);

    text = "2015/05/25";
    results = chrono.parse(text);
    resultDate = results[0].start.date();
    ok(results.length == 1, JSON.stringify(results) )
    ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 1000, resultDate +'/' +expectDate);

    var text = "05-25-2015";
    var results = chrono.parse(text);
    var resultDate = results[0].start.date();
    ok(results.length == 1, JSON.stringify(results) )
    ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 1000, resultDate +'/' +expectDate);

    text = "05/25/2015";
    results = chrono.parse(text);
    resultDate = results[0].start.date();
    ok(results.length == 1, JSON.stringify(results) )
    ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 1000, resultDate +'/' +expectDate);

    text = "05.25.2015";
    results = chrono.parse(text);
    resultDate = results[0].start.date();
    ok(results.length == 1, JSON.stringify(results) );
    ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 1000, resultDate +'/' +expectDate);

    // unambiguous date pattern
    text = "25/05/2015";
    results = chrono.parse(text);
    resultDate = results[0].start.date();
    ok(results.length == 1, JSON.stringify(results) )
    ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 1000, resultDate +'/' +expectDate);

    // ambiguous US date pattern, expect 5th of June
    expectDate = new Date(2015, 5, 5, 12, 0);
    text = "06/05/2015";
    results = chrono.parse(text);
    resultDate = results[0].start.date();
    ok(results.length == 1, JSON.stringify(results) )
    ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 1000, resultDate +'/' +expectDate);

    expectDate = new Date(2015, 7, 13, 12, 0);
    text = "2015.8.13";
    results = chrono.parse(text);
    resultDate = results[0].start.date();
    ok(results.length == 1, JSON.stringify(results) )
    ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 1000, resultDate +'/' +expectDate);

    expectDate = new Date(2015, 7, 13, 12, 0);
    text = "2015.08.13";
    results = chrono.parse(text);
    resultDate = results[0].start.date();
    ok(results.length == 1, JSON.stringify(results) )
    ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 1000, resultDate +'/' +expectDate);

    expectDate = new Date(2015, 7, 13, 12, 0);
    text = "2015.08.13";
    results = chrono.parse(text);
    resultDate = results[0].start.date();
    ok(results.length == 1, JSON.stringify(results) )
    ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 1000, resultDate +'/' +expectDate);

    expectDate = new Date(2007, 7, 13, 12, 0);
    text = "2007/8/13";
    results = chrono.parse(text);
    resultDate = results[0].start.date();
    ok(results.length == 1, JSON.stringify(results) )
    ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 1000, resultDate +'/' +expectDate);

    expectDate = new Date(2007, 7, 13, 12, 0);
    text = "2007/08/13";
    results = chrono.parse(text);
    resultDate = results[0].start.date();
    ok(results.length == 1, JSON.stringify(results) )
    ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 1000, resultDate +'/' +expectDate);


    expectDate = new Date(1999, 7, 13, 12, 0);
    text = "8/13/99";
    results = chrono.parse(text);
    resultDate = results[0].start.date();
    ok(results.length == 1, JSON.stringify(results) )
    ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 1000, resultDate +'/' +expectDate);

    expectDate = new Date(1989, 7, 13, 12, 0);
    text = "8/13/89";
    results = chrono.parse(text);
    resultDate = results[0].start.date();
    ok(results.length == 1, JSON.stringify(results) )
    ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 1000, resultDate +'/' +expectDate);


});


test("Test - Impossible Date (Strict Mode)", function() {

    var text = "8/32/2014";
    var results = chrono.strict.parse(text, new Date(2012,7,10));
    ok(results.length == 0, JSON.stringify( results ) )

    var text = "8/32";
    var results = chrono.strict.parse(text, new Date(2012,7,10));
    ok(results.length == 0, JSON.stringify( results ) )

    var text = "2/29/2014";
    var results = chrono.strict.parse(text, new Date(2012,7,10));
    ok(results.length == 0, JSON.stringify( results ))

    var text = "2014/22/29";
    var results = chrono.strict.parse(text, new Date(2012,7,10));
    ok(results.length == 0, JSON.stringify( results ))

    var text = "2014/13/22";
    var results = chrono.strict.parse(text, new Date(2012,7,10));
    ok(results.length == 0, JSON.stringify( results ))
});


test("Test - Impossible Dates (Casual Mode)", function() {
 
    var text = "9/31/2015";
    var expectDate = new Date(2015, 9, 1, 12, 0);
    var results = chrono.parse(text);
    var resultDate = results[0].start.date();
    ok(results.length == 1, JSON.stringify(results) )
    ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 1000, resultDate +'/' +expectDate);
});

