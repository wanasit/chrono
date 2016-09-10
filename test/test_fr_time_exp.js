
test("Test - Single Expression", function() {


    var text = "8h10";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index')
        ok(result.text == '8h10', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('hour') == 8, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )


        ok(!result.start.isCertain('day'))
        ok(!result.start.isCertain('month'))
        ok(!result.start.isCertain('year'))
        ok(result.start.isCertain('hour'))
        ok(result.start.isCertain('minute'))
        ok(!result.start.isCertain('second'))
        ok(!result.start.isCertain('millisecond'))

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 8, 10);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "8h10m";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index')
        ok(result.text == '8h10m', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('hour') == 8, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )


        ok(!result.start.isCertain('day'))
        ok(!result.start.isCertain('month'))
        ok(!result.start.isCertain('year'))
        ok(result.start.isCertain('hour'))
        ok(result.start.isCertain('minute'))
        ok(!result.start.isCertain('second'))
        ok(!result.start.isCertain('millisecond'))

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 8, 10);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "8h10m00";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index')
        ok(result.text == '8h10m00', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('hour') == 8, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )


        ok(!result.start.isCertain('day'))
        ok(!result.start.isCertain('month'))
        ok(!result.start.isCertain('year'))
        ok(result.start.isCertain('hour'))
        ok(result.start.isCertain('minute'))
        ok(result.start.isCertain('second'))
        ok(!result.start.isCertain('millisecond'))

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 8, 10);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "8h10m00s";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index')
        ok(result.text == '8h10m00s', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('hour') == 8, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )


        ok(!result.start.isCertain('day'))
        ok(!result.start.isCertain('month'))
        ok(!result.start.isCertain('year'))
        ok(result.start.isCertain('hour'))
        ok(result.start.isCertain('minute'))
        ok(result.start.isCertain('second'))
        ok(!result.start.isCertain('millisecond'))

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
        ok(!result.start.isCertain('second'))
        ok(!result.start.isCertain('millisecond'))


      var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 20, 10);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "8h10 PM";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index')
        ok(result.text == '8h10 PM', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('hour') == 20, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(!result.start.isCertain('second'))
        ok(!result.start.isCertain('millisecond'))


      var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 20, 10);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "1230pm";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index')
        ok(result.text == '1230pm', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('hour') == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 30, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(!result.start.isCertain('second'))
        ok(!result.start.isCertain('millisecond'))


      var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 12, 30);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }
	
    var text = "5:16p";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index')
        ok(result.text == '5:16p', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('hour') == 17, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 16, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(!result.start.isCertain('second'))
        ok(!result.start.isCertain('millisecond'))


      var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 17, 16);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "5h16p";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index')
        ok(result.text == '5h16p', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('hour') == 17, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 16, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(!result.start.isCertain('second'))
        ok(!result.start.isCertain('millisecond'))


      var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 17, 16);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "5h16mp";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index')
        ok(result.text == '5h16mp', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('hour') == 17, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 16, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(!result.start.isCertain('second'))
        ok(!result.start.isCertain('millisecond'))


      var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 17, 16);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "5:16 p.m.";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index')
        ok(result.text == '5:16 p.m.', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('hour') == 17, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 16, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(!result.start.isCertain('second'))
        ok(!result.start.isCertain('millisecond'))


      var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 17, 16);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "5h16 p.m.";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index')
        ok(result.text == '5h16 p.m.', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('hour') == 17, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 16, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(!result.start.isCertain('second'))
        ok(!result.start.isCertain('millisecond'))


      var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 17, 16);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "RDV à 6.13 AM";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 4, 'Wrong index')
        ok(result.text == 'à 6.13 AM', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('hour') == 6, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 13, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 6, 13);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = '13h-15h';
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index')
        ok(result.text == '13h-15h', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('hour') == 13, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 0, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
        ok(result.start.get('meridiem') == 1, 'Test Result - (Meridiem) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 13, 00);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    
        ok(result.end, JSON.stringify(result.start) )
        ok(result.end.get('hour') == 15, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
        ok(result.end.get('minute') == 0, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
        ok(result.end.get('meridiem') == 1, 'Test Result - (Meridiem) ' + JSON.stringify(result.start) )

        var resultDate = result.end.date();
        var expectDate = new Date(2012, 7, 10, 15, 00);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = '13-15h';
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index')
        ok(result.text == '13-15h', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('hour') == 13, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 0, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
        ok(result.start.get('meridiem') == 1, 'Test Result - (Meridiem) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 13, 00);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    
        ok(result.end, JSON.stringify(result.start) )
        ok(result.end.get('hour') == 15, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
        ok(result.end.get('minute') == 0, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
        ok(result.end.get('meridiem') == 1, 'Test Result - (Meridiem) ' + JSON.stringify(result.start) )

        var resultDate = result.end.date();
        var expectDate = new Date(2012, 7, 10, 15, 00);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = '1-3pm';
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index')
        ok(result.text == '1-3pm', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('hour') == 13, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 0, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
        ok(result.start.get('meridiem') == 1, 'Test Result - (Meridiem) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 13, 00);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    
        ok(result.end, JSON.stringify(result.start) )
        ok(result.end.get('hour') == 15, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
        ok(result.end.get('minute') == 0, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
        ok(result.end.get('meridiem') == 1, 'Test Result - (Meridiem) ' + JSON.stringify(result.start) )

        var resultDate = result.end.date();
        var expectDate = new Date(2012, 7, 10, 15, 00);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = '11pm-2';
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index')
        ok(result.text == '11pm-2', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('hour') == 23, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 0, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
        ok(result.start.get('meridiem') == 1, 'Test Result - (Meridiem) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 23, 00);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    
        ok(result.end, JSON.stringify(result.start) )
        ok(result.end.get('hour') == 2, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
        ok(result.end.get('minute') == 0, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
        ok(result.end.get('meridiem') == 0, 'Test Result - (Meridiem) ' + JSON.stringify(result.start) )

        var resultDate = result.end.date();
        var expectDate = new Date(2012, 7, 11, 2, 00);
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
        ok(!result.start.isCertain('second'))
        ok(!result.start.isCertain('millisecond'))

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
        ok(!result.end.isCertain('second'))
        ok(!result.end.isCertain('millisecond'))

        var resultDate = result.end.date();
        var expectDate = new Date(2012, 7, 10, 12, 32);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "8:10 - 12h32";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index')
        ok(result.text == '8:10 - 12h32', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('hour') == 8, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        ok(!result.start.isCertain('day'))
        ok(!result.start.isCertain('month'))
        ok(!result.start.isCertain('year'))
        ok(result.start.isCertain('hour'))
        ok(result.start.isCertain('minute'))
        ok(!result.start.isCertain('second'))
        ok(!result.start.isCertain('millisecond'))

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
        ok(!result.end.isCertain('second'))
        ok(!result.end.isCertain('millisecond'))

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
        ok(result.end.get('hour') == 23, 'Test Result - (Day) ' + JSON.stringify(result.end) )
        ok(result.end.get('minute') == 0, 'Test Result - (Day) ' + JSON.stringify(result.end) )
        ok(result.end.get('meridiem') == 1, 'Test Result - (Day) ' + JSON.stringify(result.end) )

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

    var text = "12h12:99s";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 0, JSON.stringify( results ) )


    var text = "13.12 PM";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 0, JSON.stringify( results ) )
});

test("Test - Date + Time Expression", function() {

    var text = "Quelque chose se passe le 2014-04-18 à 3h00";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 26, 'Wrong index')
        ok(result.text == '2014-04-18 à 3h00', result.text )

        ok(result.start.get('year') == 2014, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 4, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 18, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('hour') == 3, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 0, 'Test Result - (minute) ' + JSON.stringify(result.start) )
        ok(result.start.get('second') == 0, 'Test Result - (second) ' + JSON.stringify(result.start) )
        ok(result.start.get('millisecond') == 0, 'Test Result - (millisecond) ' + JSON.stringify(result.start) )
        ok(!result.start.isCertain('millisecond'))

        var resultDate = result.start.date();
        var expectDate = new Date(2014, 4-1, 18, 3, 0);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.start.date ' + resultDate +'/' +expectDate)
    }

    var text = "Quelque chose se passe le 10 Août 2012 à 10:12:59";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 26, 'Wrong index')
        ok(result.text == '10 Août 2012 à 10:12:59', result.text )

        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('hour') == 10, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 12, 'Test Result - (minute) ' + JSON.stringify(result.start) )
        ok(result.start.get('second') == 59, 'Test Result - (second) ' + JSON.stringify(result.start) )
        ok(result.start.get('millisecond') == 0, 'Test Result - (millisecond) ' + JSON.stringify(result.start) )
        ok(!result.start.isCertain('millisecond'))

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 10, 12, 59);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.start.date ' + resultDate +'/' +expectDate)
    }

    var text = "Quelque chose se passe le 15juin 2016 20h";
    var results = chrono.parse(text, new Date(2016,6,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 26, 'Wrong index')
        ok(result.text == '15juin 2016 20h', result.text )

        ok(result.start.get('year') == 2016, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 6, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 15, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('hour') == 20, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 00, 'Test Result - (minute) ' + JSON.stringify(result.start) )
        ok(result.start.get('second') == 00, 'Test Result - (second) ' + JSON.stringify(result.start) )
        ok(result.start.get('millisecond') == 0, 'Test Result - (millisecond) ' + JSON.stringify(result.start) )
        ok(!result.start.isCertain('millisecond'))

        var resultDate = result.start.date();
        var expectDate = new Date(2016, 6-1, 15, 20, 00, 00);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.start.date ' + resultDate +'/' +expectDate)
    }

    var text = "Quelque chose se passe le 2014-04-18 7:00 - 8h00 ...";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 26, 'Wrong index')
        ok(result.text == '2014-04-18 7:00 - 8h00', result.text )

        ok(result.start.get('year') == 2014, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 4, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 18, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('hour') == 7, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 0, 'Test Result - (minute) ' + JSON.stringify(result.start) )
        ok(result.start.get('second') == 0, 'Test Result - (second) ' + JSON.stringify(result.start) )
        ok(result.start.get('millisecond') == 0, 'Test Result - (millisecond) ' + JSON.stringify(result.start) )
        ok(!result.start.isCertain('meridiem'))
        ok(!result.start.isCertain('millisecond'))

        var resultDate = result.start.date();
        var expectDate = new Date(2014, 4-1, 18, 7, 0);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.start.date ' + resultDate +'/' +expectDate)


        ok(result.end.get('year') == 2014, 'Test Result - (Year) ' + JSON.stringify(result.end) )
        ok(result.end.get('month') == 4, 'Test Result - (Month) ' + JSON.stringify(result.end) )
        ok(result.end.get('day') == 18, 'Test Result - (Day) ' + JSON.stringify(result.end) )
        ok(result.end.get('hour') == 8, 'Test Result - (Hour) ' + JSON.stringify(result.end) )
        ok(result.end.get('minute') == 0, 'Test Result - (minute) ' + JSON.stringify(result.end) )
        ok(result.end.get('second') == 0, 'Test Result - (second) ' + JSON.stringify(result.end) )
        ok(result.end.get('millisecond') == 0, 'Test Result - (millisecond) ' + JSON.stringify(result.end) )
        ok(!result.end.isCertain('meridiem'))
        ok(!result.end.isCertain('millisecond'))

        var resultDate = result.end.date();
        var expectDate = new Date(2014, 4-1, 18, 8, 0);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.start.date ' + resultDate +'/' +expectDate)
    }



    var text = "Quelque chose se passe le 2014-04-18 de 7:00 à 20:00 ...";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 26, 'Wrong index')
        ok(result.text == '2014-04-18 de 7:00 à 20:00', result.text )

        ok(result.start.get('year') == 2014, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 4, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 18, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('hour') == 7, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 0, 'Test Result - (minute) ' + JSON.stringify(result.start) )
        ok(result.start.get('second') == 0, 'Test Result - (second) ' + JSON.stringify(result.start) )
        ok(result.start.get('millisecond') == 0, 'Test Result - (millisecond) ' + JSON.stringify(result.start) )
        ok(!result.start.isCertain('meridiem'))
        ok(!result.start.isCertain('millisecond'))

        var resultDate = result.start.date();
        var expectDate = new Date(2014, 4-1, 18, 7, 0);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.start.date ' + resultDate +'/' +expectDate)


        ok(result.end.get('year') == 2014, 'Test Result - (Year) ' + JSON.stringify(result.end) )
        ok(result.end.get('month') == 4, 'Test Result - (Month) ' + JSON.stringify(result.end) )
        ok(result.end.get('day') == 18, 'Test Result - (Day) ' + JSON.stringify(result.end) )
        ok(result.end.get('hour') == 20, 'Test Result - (Hour) ' + JSON.stringify(result.end) )
        ok(result.end.get('minute') == 0, 'Test Result - (minute) ' + JSON.stringify(result.end) )
        ok(result.end.get('second') == 0, 'Test Result - (second) ' + JSON.stringify(result.end) )
        ok(result.end.get('millisecond') == 0, 'Test Result - (millisecond) ' + JSON.stringify(result.end) )
        ok(!result.start.isCertain('meridiem'))
        ok(!result.end.isCertain('millisecond'))

        var resultDate = result.end.date();
        var expectDate = new Date(2014, 4-1, 18, 20, 0);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.start.date ' + resultDate +'/' +expectDate)
    }
})


test("Test - Time Expression's Meridiem imply", function() {

    var text = "1pm-3";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index')
        ok(result.text == '1pm-3', result.text )

        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('hour') == 13, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 0, 'Test Result - (minute) ' + JSON.stringify(result.start) )
        ok(result.start.get('second') == 0, 'Test Result - (second) ' + JSON.stringify(result.start) )
        ok(result.start.get('millisecond') == 0, 'Test Result - (millisecond) ' + JSON.stringify(result.start) )
        ok(result.start.get('meridiem') == 1, 'Test Result - (meridiem) ' + JSON.stringify(result.start) )
        ok(result.start.isCertain('meridiem'), JSON.stringify(result))

        ok(result.end.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.end) )
        ok(result.end.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.end) )
        ok(result.end.get('day') == 11, 'Test Result - (Day) ' + JSON.stringify(result.end) )
        ok(result.end.get('hour') == 3, 'Test Result - (Hour) ' + JSON.stringify(result.end) )
        ok(result.end.get('minute') == 0, 'Test Result - (minute) ' + JSON.stringify(result.end) )
        ok(result.end.get('second') == 0, 'Test Result - (second) ' + JSON.stringify(result.end) )
        ok(result.end.get('millisecond') == 0, 'Test Result - (millisecond) ' + JSON.stringify(result.end) )
        ok(!result.end.isCertain('meridiem'), JSON.stringify(result))
    }

    var text = "18-04-2014 1pm-3";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index')
        ok(result.text == '18-04-2014 1pm-3', result.text )

        ok(result.start.get('year') == 2014, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 4, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 18, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('hour') == 13, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 0, 'Test Result - (minute) ' + JSON.stringify(result.start) )
        ok(result.start.get('second') == 0, 'Test Result - (second) ' + JSON.stringify(result.start) )
        ok(result.start.get('millisecond') == 0, 'Test Result - (millisecond) ' + JSON.stringify(result.start) )
        ok(result.start.get('meridiem') == 1, 'Test Result - (meridiem) ' + JSON.stringify(result.start) )
        ok(result.start.isCertain('meridiem'), JSON.stringify(result))

        ok(result.end.get('year') == 2014, 'Test Result - (Year) ' + JSON.stringify(result.end) )
        ok(result.end.get('month') == 4, 'Test Result - (Month) ' + JSON.stringify(result.end) )
        ok(result.end.get('day') == 19, 'Test Result - (Day) ' + JSON.stringify(result.end) )
        ok(result.end.get('hour') == 3, 'Test Result - (Hour) ' + JSON.stringify(result.end) )
        ok(result.end.get('minute') == 0, 'Test Result - (minute) ' + JSON.stringify(result.end) )
        ok(result.end.get('second') == 0, 'Test Result - (second) ' + JSON.stringify(result.end) )
        ok(result.end.get('millisecond') == 0, 'Test Result - (millisecond) ' + JSON.stringify(result.end) )
        ok(!result.end.isCertain('meridiem'), JSON.stringify(result))
    }

    var text = "aujourd'hui de 1pm-3";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if (result) {
        ok(result.index == 0, 'Wrong index')
        ok(result.text == "aujourd'hui de 1pm-3", result.text )

        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('hour') == 13, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 0, 'Test Result - (minute) ' + JSON.stringify(result.start) )
        ok(result.start.get('second') == 0, 'Test Result - (second) ' + JSON.stringify(result.start) )
        ok(result.start.get('millisecond') == 0, 'Test Result - (millisecond) ' + JSON.stringify(result.start) )
        ok(result.start.get('meridiem') == 1, 'Test Result - (meridiem) ' + JSON.stringify(result.start) )
        ok(result.start.isCertain('meridiem'), JSON.stringify(result))

        ok(result.end.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.end) )
        ok(result.end.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.end) )
        ok(result.end.get('day') == 11, 'Test Result - (Day) ' + JSON.stringify(result.end) )
        ok(result.end.get('hour') == 3, 'Test Result - (Hour) ' + JSON.stringify(result.end) )
        ok(result.end.get('minute') == 0, 'Test Result - (minute) ' + JSON.stringify(result.end) )
        ok(result.end.get('second') == 0, 'Test Result - (second) ' + JSON.stringify(result.end) )
        ok(result.end.get('millisecond') == 0, 'Test Result - (millisecond) ' + JSON.stringify(result.end) )
        ok(!result.end.isCertain('meridiem'), JSON.stringify(result))
    }

    var text = "ajd de 1am-3";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if (result) {
        ok(result.index == 0, 'Wrong index')
        ok(result.text == 'ajd de 1am-3', result.text )

        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('hour') == 1, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 0, 'Test Result - (minute) ' + JSON.stringify(result.start) )
        ok(result.start.get('second') == 0, 'Test Result - (second) ' + JSON.stringify(result.start) )
        ok(result.start.get('millisecond') == 0, 'Test Result - (millisecond) ' + JSON.stringify(result.start) )
        ok(result.start.get('meridiem') == 0, 'Test Result - (meridiem) ' + JSON.stringify(result.start) )
        ok(result.start.isCertain('meridiem'), JSON.stringify(result))

        ok(result.end.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.end) )
        ok(result.end.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.end) )
        ok(result.end.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.end) )
        ok(result.end.get('hour') == 3, 'Test Result - (Hour) ' + JSON.stringify(result.end) )
        ok(result.end.get('minute') == 0, 'Test Result - (minute) ' + JSON.stringify(result.end) )
        ok(result.end.get('second') == 0, 'Test Result - (second) ' + JSON.stringify(result.end) )
        ok(result.end.get('millisecond') == 0, 'Test Result - (millisecond) ' + JSON.stringify(result.end) )
        ok(!result.end.isCertain('meridiem'), JSON.stringify(result))
    }
})


test("Test - Timezone extraction", function() {

    var text = "Vendredi à 2 pm";
    var result = chrono.parse(text, new Date(2016, 3, 28))[0];
    ok(result.text == text, result.text)
    ok(!result.start.isCertain('timezoneOffset'), JSON.stringify(result.start))
    ok(!result.start.get('timezoneOffset'), JSON.stringify(result.start))


    var text = "vendredi 2 pm EST";
    var result = chrono.parse(text, new Date(2016, 3, 28))[0];
    ok(result.text == text,  JSON.stringify(result))
    ok(result.start.isCertain('timezoneOffset'), JSON.stringify(result.start))
    ok(result.start.get('timezoneOffset') === -300, JSON.stringify(result.start))

    var text = "vendredi 15h CET";
    var result = chrono.parse(text, new Date(2016, 3, 28))[0];
    ok(result.text == text,  JSON.stringify(result))
    ok(result.start.isCertain('timezoneOffset'), JSON.stringify(result.start))
    ok(result.start.get('timezoneOffset') === 60, JSON.stringify(result.start))

    var text = "vendredi 15h cest";
    var result = chrono.parse(text, new Date(2016, 3, 28))[0];
    ok(result.text == text,  JSON.stringify(result))
    ok(result.start.isCertain('timezoneOffset'), JSON.stringify(result.start))
    ok(result.start.get('timezoneOffset') === 120, JSON.stringify(result.start))

    var text = "Vendredi à 2 pm est";
    var result = chrono.parse(text, new Date(2016, 3, 28))[0];
    ok(result.text == text, result.text)
    ok(result.start.isCertain('timezoneOffset'), JSON.stringify(result.start))
    ok(result.start.get('timezoneOffset') === -300, JSON.stringify(result.start))


    var text = "Vendredi à 2 pm j'ai rdv...";
    var result = chrono.parse(text, new Date(2016, 3, 28))[0];
    ok(result.text == 'Vendredi à 2 pm', result.text)
    ok(!result.start.isCertain('timezoneOffset'), JSON.stringify(result.start))
    ok(!result.start.get('timezoneOffset'), JSON.stringify(result.start))


    var text = "Vendredi à 2 pm je vais faire quelque chose";
    var result = chrono.parse(text, new Date(2016, 3, 28))[0];
    ok(result.text == 'Vendredi à 2 pm', result.text)
    ok(!result.start.isCertain('timezoneOffset'), JSON.stringify(result.start))
    ok(!result.start.get('timezoneOffset'), JSON.stringify(result.start))
})


test("Test - Random date + time expression", function() {

    var text = "lundi 29/4/2013 630-930am";
    var result = chrono.parse(text)[0];
    ok(result.text == text, result.text)
    
    var text = "mercredi 1/5/2013 1115am";
    var result = chrono.parse(text)[0];
    ok(result.text == text, result.text)
    
    var text = "vendredi 3/5/2013 1230pm";
    var result = chrono.parse(text)[0];
    ok(result.text == text, result.text)

    
    var text = "dimanche 6/5/2013  750am-910am";
    var result = chrono.parse(text)[0];
    ok(result.text == text, result.text)

    var text = "lundi 13/5/2013 630-930am";
    var result = chrono.parse(text)[0];
    ok(result.text == text, result.text)

    var text = "wednesday 5/15/2013 1030am";
    var result = chrono.parse(text)[0];
    ok(result.text == text, result.text)

    var text = "Vendredi 21/6/2013 2:30";
    var result = chrono.parse(text)[0];
    ok(result.text == text, result.text)

    var text = "mardi 7/2/2013 1-230 pm";
    var result = chrono.parse(text)[0];
    ok(result.text == text, result.text)

    var text = "mardi 7/2/2013 1-23h0";
    var result = chrono.parse(text)[0];
    ok(result.text == text, result.text)

    var text = "mardi 7/2/2013 1h-23h0m";
    var result = chrono.parse(text)[0];
    ok(result.text == text, result.text)

    var text = "Lundi, 24/6/2013, 7:00pm - 8:30pm";
    var result = chrono.parse(text)[0];
    ok(result.text == text, result.text)

    var text = "Jeudi6/5/2013 de 7h à 10h";
    var result = chrono.parse(text)[0];
    ok(result.text == text, result.text)

    var text = "Mercredi, 3 juil 2013 14h";
    var result = chrono.parse(text)[0];
    ok(result.text == text, result.text)


    var text = "18h";
    var result = chrono.parse(text)[0];
    ok(result.text == text, result.text)


    var text = "18-22h";
    var result = chrono.parse(text)[0];
    ok(result.text == text, result.text)

    var text = "11h-13";
    var result = chrono.parse(text)[0];
    ok(result.text == text, result.text)

    var text = "that I need to know or am I covered?";
    var result = chrono.parse(text);
    ok(result.length == 0, result)

    var text = "à 12h";
    var result = chrono.parse(text)[0];
    ok(result.text == text, result.text)

    var text = "a midi";
    var result = chrono.parse(text)[0];
    ok(result.text == text, result.text)
    ok(result.start.get('hour') == 12, JSON.stringify(result.start))

    var text = "à minuit";
    var result = chrono.parse(text)[0];
    ok(result.text == text, result.text)
})