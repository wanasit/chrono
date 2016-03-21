
test("Test - Single Expression", function() {
    var text = 'She is getting married next year (July 2017).';
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2017, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 1, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        ok(result.index == 34, 'Wrong index')
        ok(result.text == 'July 2017', result.text )

        var resultDate = result.start.date();
        var expectDate = new Date(2017, 7-1, 1, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = 'She is leaving in August.';
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 1, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        ok(result.index == 18, 'Wrong index')
        ok(result.text == 'August', result.text )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 1, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = 'I am arriving sometime in August, 2012, probably.';
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 1, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        ok(result.index == 26, 'Wrong index')
        ok(result.text == 'August, 2012', result.text )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 1, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = 'August 10, 2012';
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        ok(result.index == 0, 'Wrong index')
        ok(result.text == 'August 10, 2012', result.text )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = 'Nov 12, 2011';
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2011, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 11, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        ok(result.index == 0, 'Wrong index')
        ok(result.text == 'Nov 12, 2011', result.text )

        var resultDate = result.start.date();
        var expectDate = new Date(2011, 11-1, 12, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = 'The Deadline is August 10';
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        ok(result.index == 16, 'Wrong index')
        ok(result.text == 'August 10', result.text )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "The Deadline is August 10 2555 BE";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 16, 'Wrong index')
        ok(result.text == 'August 10 2555 BE', result.text )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = 'The Deadline is Tuesday, January 10';
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){

        ok(result.text == 'Tuesday, January 10', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 1, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('weekday') == 2, 'Test Result - (Weekday) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 1-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = 'Sun, Mar. 6, 2016';
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );
    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start));
        ok(result.start.get('year') == 2016, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 3, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 6, 'Test Result - (Day) ' + JSON.stringify(result.start));
    }

    var text = 'Sun, March 6, 2016';
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );
    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start));
        ok(result.start.get('year') == 2016, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 3, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 6, 'Test Result - (Day) ' + JSON.stringify(result.start));
    }

    var text = 'Sun., March 6, 2016';
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );
    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start));
        ok(result.start.get('year') == 2016, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 3, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 6, 'Test Result - (Day) ' + JSON.stringify(result.start));
    }

    var text = 'Sunday, March 6, 2016';
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );
    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start));
        ok(result.start.get('year') == 2016, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 3, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 6, 'Test Result - (Day) ' + JSON.stringify(result.start));
    }

    var text = 'Sunday, March 6, 2016';
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );
    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start));
        ok(result.start.get('year') == 2016, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 3, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 6, 'Test Result - (Day) ' + JSON.stringify(result.start));
    }
});

test("Test - Range expression", function() {

    var text = 'August 10 - 22, 2012';
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){

        ok(result.index == 0, 'Wrong index')
        ok(result.text == 'August 10 - 22, 2012', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
        

        ok(result.end, JSON.stringify(result.end) )
        ok(result.end.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.end.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.end.get('day') == 22, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        var resultDate = result.end.date();
        var expectDate = new Date(2012, 8-1, 22, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = 'August 10 to 22, 2012';
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){

        ok(result.index == 0, 'Wrong index')
        ok(result.text == 'August 10 to 22, 2012', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
        

        ok(result.end, JSON.stringify(result.end) )
        ok(result.end.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.end.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.end.get('day') == 22, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        var resultDate = result.end.date();
        var expectDate = new Date(2012, 8-1, 22, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = 'August 10 - November 12';
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){

        ok(result.index == 0, 'Wrong index')
        ok(result.text == 'August 10 - November 12', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
        

        ok(result.end, JSON.stringify(result.end) )
        ok(result.end.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.end.get('month') == 11, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.end.get('day') == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        var resultDate = result.end.date();
        var expectDate = new Date(2012, 11-1, 12, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = 'Aug 10 to Nov 12';
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){

        ok(result.index == 0, 'Wrong index')
        ok(result.text == 'Aug 10 to Nov 12', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
        

        ok(result.end, JSON.stringify(result.end) )
        ok(result.end.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.end.get('month') == 11, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.end.get('day') == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        var resultDate = result.end.date();
        var expectDate = new Date(2012, 11-1, 12, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = 'Aug 10 - Nov 12, 2013';
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){

        ok(result.index == 0, 'Wrong index')
        ok(result.text == 'Aug 10 - Nov 12, 2013', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 8-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
        

        ok(result.end, JSON.stringify(result.end) )
        ok(result.end.get('year') == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.end.get('month') == 11, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.end.get('day') == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        var resultDate = result.end.date();
        var expectDate = new Date(2013, 11-1, 12, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = 'Aug 10 - Nov 12, 2011';
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        
        ok(result.index == 0, 'Wrong index')
        ok(result.text == 'Aug 10 - Nov 12, 2011', result.text )
        
        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2011, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2011, 8-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
        

        ok(result.end, JSON.stringify(result.end) )
        ok(result.end.get('year') == 2011, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.end.get('month') == 11, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.end.get('day') == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        var resultDate = result.end.date();
        var expectDate = new Date(2011, 11-1, 12, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }
});


test("Test - Impossible Dates (Strict Mode)", function() {
 
    var text = "August 32, 2014";
    var results = chrono.strict.parse(text, new Date(2012,7,10));
    ok(results.length == 0, JSON.stringify( results ) )

    var text = "Febuary 29, 2014";
    var results = chrono.strict.parse(text, new Date(2012,7,10));
    ok(results.length == 0, JSON.stringify( results ))

    var text = "August 32";
    var results = chrono.strict.parse(text, new Date(2012,7,10));
    ok(results.length == 0, JSON.stringify( results ))

    var text = "Febuary 29";
    var results = chrono.strict.parse(text, new Date(2012,7,10));
    ok(results.length == 0, JSON.stringify( results ))

});

test("Test - Impossible Dates (Casual Mode)", function() {
 
    var text = "August 32, 2015";
    var expectDate = new Date(2015, 8, 1, 12, 0);
    var results = chrono.parse(text);
    var resultDate = results[0].start.date();
    ok(results.length == 1, JSON.stringify(results) )
    ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 1000, resultDate +'/' +expectDate);
});
