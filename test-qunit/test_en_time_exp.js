
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

test("Test - Range Expression", function() {

    var text = "8:10 - 12.32";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index')
        ok(result.text == '8:10 - 12.32', result.text )

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
        
        ok(result.end, JSON.stringify(result.start) )
        ok(result.end.get('hour') == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.end.get('minute') == 32, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        ok(!result.end.isCertain('day'))
        ok(!result.end.isCertain('month'))
        ok(!result.end.isCertain('year'))
        ok(result.end.isCertain('hour'))
        ok(result.end.isCertain('minute'))
        ok(result.end.isCertain('second'))

        var resultDate = result.end.date();
        var expectDate = new Date(2012, 7, 10, 12, 32);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = " from 6:30pm to 11:00pm ";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 1, 'Wrong index')
        ok(result.text == 'from 6:30pm to 11:00pm', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('hour') == 18, 'Test Result - (Day) ' + JSON.stringify(result.start))
        ok(result.start.get('minute') == 30, 'Test Result - (Day) ' + JSON.stringify(result.start))
        ok(result.start.get('meridiem') == 1, 'Test Result - (Day) ' + JSON.stringify(result.start))

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 18, 30);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
        
        ok(result.end, JSON.stringify(result.start) )
        ok(result.end.get('hour') == 23, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.end.get('minute') == 0, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.end.get('meridiem') == 1, 'Test Result - (Day) ' + JSON.stringify(result.start))

        var resultDate = result.end.date();
        var expectDate = new Date(2012, 7, 10, 23, 0);
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

test("Test - Date + Time Expression", function() {

    var text = "Something happen on 2014-04-18 3.00 AM";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 20, 'Wrong index')
        ok(result.text == '2014-04-18 3.00 AM', result.text )

        ok(result.start.get('year') == 2014, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 4, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 18, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('hour') == 3, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 0, 'Test Result - (minute) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2014, 4-1, 18, 3, 0);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.start.date ' + resultDate +'/' +expectDate)
    }

    var text = "Something happen on August 10, 2012 10:12:59 pm";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 20, 'Wrong index')
        ok(result.text == 'August 10, 2012 10:12:59 pm', result.text )

        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('hour') == 22, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 12, 'Test Result - (minute) ' + JSON.stringify(result.start) )
        ok(result.start.get('second') == 59, 'Test Result - (minute) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 22, 12, 59);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.start.date ' + resultDate +'/' +expectDate)
    }

    var text = "Something happen on 2014-04-18 7:00 - 8:00 AM...";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 20, 'Wrong index')
        ok(result.text == '2014-04-18 7:00 - 8:00 AM', result.text )

        ok(result.start.get('year') == 2014, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 4, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 18, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('hour') == 7, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 0, 'Test Result - (minute) ' + JSON.stringify(result.start) )
        ok(result.start.get('meridiem') == 0, 'Test Result - (meridiem) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2014, 4-1, 18, 7, 0);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.start.date ' + resultDate +'/' +expectDate)


        ok(result.end.get('year') == 2014, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.end.get('month') == 4, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.end.get('day') == 18, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.end.get('hour') == 8, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
        ok(result.end.get('minute') == 0, 'Test Result - (minute) ' + JSON.stringify(result.start) )
        ok(result.end.get('meridiem') == 0, 'Test Result - (meridiem) ' + JSON.stringify(result.start) )

        var resultDate = result.end.date();
        var expectDate = new Date(2014, 4-1, 18, 8, 0);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.start.date ' + resultDate +'/' +expectDate)
    }
})
